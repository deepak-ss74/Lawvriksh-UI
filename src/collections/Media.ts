import type { CollectionConfig } from 'payload'

import { createFolderField, createTagField } from 'payload'
import { isPayloadAdmin } from '@/access/isPayloadAdmin'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isPayloadAdmin,
    delete: isPayloadAdmin,
    read: isPayloadAdmin,
    update: isPayloadAdmin,
  },
  admin: {
    group: 'LawVriksh',
    defaultColumns: ['filename', 'matter', 'provenance', 'processingStatus', 'updatedAt'],
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create' || !doc.matter || doc.provenance === 'generated') return

        const matterId = typeof doc.matter === 'object' ? doc.matter.id : doc.matter
        const filename = doc.filename || doc.alt || 'Uploaded document'

        for (const type of ['case-map', 'chronology'] as const) {
          const existing = await req.payload.find({
            collection: 'matter-artifacts',
            where: {
              artifactKey: { equals: `${matterId}:${type}` },
            },
            limit: 1,
            depth: 0,
            overrideAccess: true,
            req,
          })

          const artifact = existing.docs[0]
          const sourceDocuments = [
            ...new Set([
              ...((artifact?.sourceDocuments || []).map((source) =>
                typeof source === 'object' ? source.id : source,
              )),
              doc.id,
            ]),
          ]

          const sharedData = {
            sourceDocuments,
            status: 'ready' as const,
            summary: `Updated from ${sourceDocuments.length} matter document${sourceDocuments.length === 1 ? '' : 's'}.`,
          }

          if (artifact) {
            await req.payload.update({
              collection: 'matter-artifacts',
              id: artifact.id,
              data: type === 'chronology'
                ? {
                    ...sharedData,
                    chronologyEvents: [
                      ...(artifact.chronologyEvents || []),
                      {
                        occurredAt: doc.createdAt,
                        title: `Document added: ${filename}`,
                        category: 'document',
                        detail: 'Automatically indexed when this document was added to the matter.',
                        sourceDocument: doc.id,
                      },
                    ],
                  }
                : {
                    ...sharedData,
                    mapNodes: [
                      ...(artifact.mapNodes || []),
                      {
                        label: filename,
                        category: 'evidence',
                        detail: 'Evidence source automatically connected to this matter.',
                        sourceDocument: doc.id,
                      },
                    ],
                  },
              overrideAccess: true,
              req,
            })
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'matter',
      type: 'relationship',
      relationTo: 'matters',
      index: true,
      admin: {
        description: 'Leave empty only for files that belong to the global library.',
        position: 'sidebar',
      },
    },
    {
      name: 'provenance',
      type: 'select',
      defaultValue: 'uploaded',
      options: [
        { label: 'Uploaded', value: 'uploaded' },
        { label: 'Generated', value: 'generated' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'processingStatus',
      type: 'select',
      defaultValue: 'ready',
      options: [
        { label: 'Processing', value: 'processing' },
        { label: 'Ready', value: 'ready' },
        { label: 'Needs review', value: 'needs-review' },
        { label: 'Failed', value: 'failed' },
      ],
      admin: { position: 'sidebar' },
    },
    createFolderField({ relationTo: 'folders' }),
    createTagField({ relationTo: 'tags' }),
  ],
  upload: {
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'private, no-store')
      return headers
    },
  },
}
