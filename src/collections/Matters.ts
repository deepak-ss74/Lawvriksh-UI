import type { CollectionConfig } from 'payload'
import { isPayloadAdmin } from '@/access/isPayloadAdmin'

export const Matters: CollectionConfig = {
  slug: 'matters',
  access: {
    create: isPayloadAdmin,
    delete: isPayloadAdmin,
    read: isPayloadAdmin,
    update: isPayloadAdmin,
  },
  admin: {
    group: 'LawVriksh',
    useAsTitle: 'name',
    defaultColumns: ['name', 'reference', 'status', 'updatedAt'],
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return

        for (const type of ['case-map', 'chronology'] as const) {
          await req.payload.create({
            collection: 'matter-artifacts',
            data: {
              artifactKey: `${doc.id}:${type}`,
              matter: doc.id,
              status: 'ready',
              title: type === 'case-map' ? 'Case map' : 'Chronology',
              type,
            },
            overrideAccess: true,
            req,
          })
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'reference',
      type: 'text',
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'On hold', value: 'on-hold' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'documents',
      type: 'join',
      collection: 'media',
      on: 'matter',
      defaultLimit: 20,
      admin: {
        description: 'Files stored inside this matter. The Media collection remains the global file library.',
      },
    },
    {
      name: 'generatedArtifacts',
      type: 'join',
      collection: 'matter-artifacts',
      on: 'matter',
      defaultLimit: 20,
      admin: {
        description: 'Independent chronology and case-map outputs generated for this matter.',
      },
    },
  ],
  timestamps: true,
}
