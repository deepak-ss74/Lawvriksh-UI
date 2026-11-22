import type { CollectionConfig } from 'payload'
import { isPayloadAdmin } from '@/access/isPayloadAdmin'

export const MatterArtifacts: CollectionConfig = {
  slug: 'matter-artifacts',
  access: {
    create: isPayloadAdmin,
    delete: isPayloadAdmin,
    read: isPayloadAdmin,
    update: isPayloadAdmin,
  },
  admin: {
    group: 'LawVriksh',
    useAsTitle: 'title',
    defaultColumns: ['title', 'matter', 'type', 'status', 'updatedAt'],
  },
  fields: [
    {
      name: 'artifactKey',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { hidden: true },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'matter',
      type: 'relationship',
      relationTo: 'matters',
      required: true,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Case map', value: 'case-map' },
        { label: 'Chronology', value: 'chronology' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'ready',
      options: [
        { label: 'Queued', value: 'queued' },
        { label: 'Processing', value: 'processing' },
        { label: 'Ready', value: 'ready' },
        { label: 'Needs review', value: 'needs-review' },
        { label: 'Failed', value: 'failed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'sourceDocuments',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'chronologyEvents',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'chronology',
      },
      fields: [
        { name: 'occurredAt', type: 'date', required: true },
        { name: 'title', type: 'text', required: true },
        {
          name: 'category',
          type: 'select',
          defaultValue: 'document',
          options: ['document', 'filing', 'hearing', 'order', 'fact'],
        },
        { name: 'detail', type: 'textarea' },
        { name: 'sourceDocument', type: 'relationship', relationTo: 'media' },
      ],
    },
    {
      name: 'mapNodes',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'case-map',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'category',
          type: 'select',
          defaultValue: 'evidence',
          options: ['party', 'advocate', 'issue', 'provision', 'evidence', 'argument', 'relief'],
        },
        { name: 'detail', type: 'textarea' },
        { name: 'sourceDocument', type: 'relationship', relationTo: 'media' },
      ],
    },
  ],
  timestamps: true,
}
