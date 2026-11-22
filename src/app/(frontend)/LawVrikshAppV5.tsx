'use client'

import { useCallback, useMemo, useState, type FormEvent } from 'react'

type IconName =
  | 'arrow'
  | 'briefcase'
  | 'building'
  | 'chat'
  | 'chevron'
  | 'clock'
  | 'close'
  | 'file'
  | 'folder'
  | 'home'
  | 'library'
  | 'map'
  | 'menu'
  | 'more'
  | 'note'
  | 'paperclip'
  | 'pin'
  | 'plus'
  | 'scale'
  | 'search'
  | 'settings'
  | 'shield'
  | 'sidebar-collapsed'
  | 'sidebar-toggle'
  | 'spark'
  | 'table'
  | 'user'

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
    building: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></>,
    chat: <path d="M21 14a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    file: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v5h5M9 13h6M9 17h6" /></>,
    folder: <path d="M3 7h7l2 2h9v10H3z" />,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
    library: <><path d="M4 4h4v16H4zM10 4h4v16h-4zM16 5l3-1 3 15-3 1z" /></>,
    map: <><circle cx="7" cy="6" r="2" /><circle cx="17" cy="7" r="2" /><circle cx="12" cy="18" r="2" /><path d="M8.8 7 15 7M8 7.5l3 8.5M16 9l-3 7" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    more: <><circle cx="5" cy="12" r="1.7" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.7" fill="currentColor" stroke="none" /></>,
    note: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 3v3M15 3v3M8 10h8M8 14h6" /></>,
    paperclip: <path d="m20 12-8.5 8.5a5 5 0 0 1-7-7L14 4a3 3 0 0 1 4 4l-9 9a1 1 0 0 1-2-2l8-8" />,
    pin: <><path d="m9 4 6 6" /><path d="m14 3 7 7-3 1-4 4-1 4-8-8 4-1 4-4z" /><path d="m8 16-5 5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    scale: <><path d="M12 3v18M6 7l6-3 6 3" /><path d="M3 13l3-6 3 6a3 3 0 0 1-6 0zM15 13l3-6 3 6a3 3 0 0 1-6 0z" /><path d="M9 21h6" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    'sidebar-collapsed': <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 3v18" /><path d="m13 9 3 3-3 3" /></>,
    'sidebar-toggle': <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 3v18" /><path d="m15 9-3 3 3 3" /></>,
    spark: <><path d="m12 3 1.2 4.3a5 5 0 0 0 3.5 3.5L21 12l-4.3 1.2a5 5 0 0 0-3.5 3.5L12 21l-1.2-4.3a5 5 0 0 0-3.5-3.5L3 12l4.3-1.2a5 5 0 0 0 3.5-3.5z" /></>,
    table: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M3 15h18M9 4v16M15 4v16" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  }

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  )
}

type MatterChat = {
  id: string
  title: string
  time: string
  matter: string
  pinned?: boolean
  updatedAt: number
}

type SavedNote = {
  id: string
  title: string
  body: string
  matter: string
  updated: string
}

const initialMatters = [
  'Asterix Precision Castings',
  'Aarohan GridTech Solutions',
  'Mobilox Innovations',
]

const initialChats: MatterChat[] = [
  { id: 'chat-1', title: 'Review supplier agreement', time: 'Today', matter: 'Asterix Precision Castings', pinned: true, updatedAt: 4 },
  { id: 'chat-2', title: 'Prepare hearing brief', time: 'Today', matter: 'Asterix Precision Castings', updatedAt: 3 },
  { id: 'chat-3', title: 'Summarise witness statement', time: 'Yesterday', matter: 'Aarohan GridTech Solutions', updatedAt: 2 },
  { id: 'chat-4', title: 'Research limitation period', time: 'Mon', matter: 'Mobilox Innovations', updatedAt: 1 },
]

export type DocumentCategory = 'case-record' | 'chat-attachment'

export interface AppDocument {
  name: string
  detail: string
  tone: string
  matter: string
  category: DocumentCategory
  size: string
  inChronology: boolean
}

const initialDocuments: AppDocument[] = [
  { name: 'Goods supply agreement.pdf', detail: '42 pages · Ready', tone: 'green', matter: 'Asterix Precision Castings', category: 'case-record', size: '14.2 MB', inChronology: true },
  { name: 'Written statement.docx', detail: '18 pages · Ready', tone: 'blue', matter: 'Asterix Precision Castings', category: 'case-record', size: '4.8 MB', inChronology: true },
  { name: 'Email correspondence.pdf', detail: '128 pages · Processing', tone: 'amber', matter: 'Asterix Precision Castings', category: 'case-record', size: '28.1 MB', inChronology: true },
  { name: 'Warehouse delivery receipt.png', detail: 'Image · In Chat', tone: 'amber', matter: 'Asterix Precision Castings', category: 'chat-attachment', size: '2.1 MB', inChronology: false },
  { name: 'Audit calculation notes.pdf', detail: '4 pages · In Chat', tone: 'blue', matter: 'Asterix Precision Castings', category: 'chat-attachment', size: '1.4 MB', inChronology: false },
  { name: 'General NDA template draft.docx', detail: '6 pages · Ad-hoc Chat', tone: 'blue', matter: 'No matter — general query', category: 'chat-attachment', size: '850 KB', inChronology: false },
  { name: 'Hearing brief.pdf', detail: '12 pages · Ready', tone: 'blue', matter: 'Aarohan GridTech Solutions', category: 'case-record', size: '6.4 MB', inChronology: true },
  { name: 'Technology services contract.pdf', detail: '31 pages · Ready', tone: 'green', matter: 'Mobilox Innovations', category: 'case-record', size: '9.2 MB', inChronology: true },
]

const initialNotes: SavedNote[] = [
  {
    id: 'note-1',
    title: 'Hearing preparation',
    body: 'Confirm the witness sequence and prepare the authorities bundle before the next hearing.',
    matter: 'Asterix Precision Castings',
    updated: 'Today',
  },
  {
    id: 'note-2',
    title: 'Supplier agreement issues',
    body: 'Review the limitation clause against the delivery schedule and correspondence.',
    matter: 'Asterix Precision Castings',
    updated: '1 Nov',
  },
  {
    id: 'note-3',
    title: 'Grid connection follow-up',
    body: 'Request the final technical annexure from the client.',
    matter: 'Aarohan GridTech Solutions',
    updated: '28 Oct',
  },
]

const suggestions = [
  { title: 'Summarise this matter', hint: 'Get the key facts and risks', icon: 'spark' as IconName },
  { title: 'Draft a case update', hint: 'Create a client-ready note', icon: 'file' as IconName },
  { title: 'What needs attention?', hint: 'Find deadlines and gaps', icon: 'clock' as IconName },
]

const matterTools: { title: string; icon: IconName; prompt?: string; count?: string }[] = [
  { title: 'Overview', icon: 'briefcase', prompt: 'Give me a concise overview of this matter' },
  { title: 'Documents', icon: 'folder' },
  { title: 'Case mapping', icon: 'map', prompt: 'Map the parties, claims, issues, and evidence in this matter' },
  { title: 'Chronology', icon: 'clock', prompt: 'Build a chronology of the key events in this matter' },
  { title: 'Tabular review', icon: 'table', prompt: 'Create a table of the key documents and findings' },
  { title: 'Drafts', icon: 'file', prompt: 'Help me create a new legal draft for this matter' },
  { title: 'Notes', icon: 'note', prompt: 'Create a structured matter note' },
  { title: 'Hearing prep', icon: 'spark', prompt: 'Prepare a hearing checklist and argument outline' },
]

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [fileScope, setFileScope] = useState<'matter' | 'global'>('matter')
  const [matterMenuOpen, setMatterMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [matterMoreOpen, setMatterMoreOpen] = useState(false)
  const [pendingMatterTool, setPendingMatterTool] = useState('')
  const [activeTool, setActiveTool] = useState('Ask LawVriksh')
  const [query, setQuery] = useState('')
  const [attachedFile, setAttachedFile] = useState('')
  const [isComposerDragActive, setIsComposerDragActive] = useState(false)
  const [activeChat, setActiveChat] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [matters, setMatters] = useState<string[]>([]) // Empty on first arrival
  const [chats, setChats] = useState<ChatHistoryItem[]>([]) // Empty on first arrival
  const [expandedMatter, setExpandedMatter] = useState('')
  const [matterActions, setMatterActions] = useState('')
  const [chatActions, setChatActions] = useState('')
  const [pinnedMatters, setPinnedMatters] = useState<string[]>([])
  const [matterSearchOpen, setMatterSearchOpen] = useState(false)
  const [matterSearch, setMatterSearch] = useState('')
  const [recentSearchOpen, setRecentSearchOpen] = useState(false)
  const [recentSearch, setRecentSearch] = useState('')
  const [librarySearch, setLibrarySearch] = useState('')
  const [noteSearch, setNoteSearch] = useState('')
  const [notes, setNotes] = useState<SavedNote[]>(initialNotes)
  const [selectedNoteId, setSelectedNoteId] = useState(initialNotes[0].id)
  const [documents, setDocuments] = useState<AppDocument[]>(initialDocuments)
  const [docCategoryTab, setDocCategoryTab] = useState<'all' | 'case-record' | 'chat-attachment'>('all')
  const [selectedFolder, setSelectedFolder] = useState<string>('all')
  const [libraryViewMode, setLibraryViewMode] = useState<'table' | 'grid'>('table')
  const [folderSearch, setFolderSearch] = useState<string>('')
  const [drawerDocTab, setDrawerDocTab] = useState<'case-record' | 'chat-attachment'>('case-record')
  const [matter, setMatter] = useState('No matter — general query') // Default general query
  const [floatingDockExpanded, setFloatingDockExpanded] = useState(false)
  const [floatingDiscoveryOpen, setFloatingDiscoveryOpen] = useState(false)
  const [dockMinimized, setDockMinimized] = useState(false)
  const [showTour, setShowTour] = useState(false)
  const [tourStep, setTourStep] = useState(1)
  const [sidebarWidth, setSidebarWidth] = useState(280)
  const [lastSidebarWidth, setLastSidebarWidth] = useState(280)
  const [isResizing, setIsResizing] = useState(false)
  const [matterIcons, setMatterIcons] = useState<Record<string, IconName>>({
    'Asterix Precision Castings': 'briefcase',
    'Aarohan GridTech Solutions': 'building',
    'Mobilox Innovations': 'spark',
  })
  const [iconPickerMatter, setIconPickerMatter] = useState<string | null>(null)

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)

    const onMouseMove = (moveEvent: MouseEvent) => {
      // 58px utility rail
      const newWidth = moveEvent.clientX - 58
      if (newWidth < 170) {
        setSidebarCollapsed(true)
      } else {
        setSidebarCollapsed(false)
        const clamped = Math.min(Math.max(newWidth, 200), 460)
        setSidebarWidth(clamped)
        setLastSidebarWidth(clamped)
      }
    }

    const onMouseUp = () => {
      setIsResizing(false)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }, [])

  const loadSampleData = () => {
    setMatters(initialMatters)
    setChats(initialChats)
    chooseMatter('Asterix Precision Castings')
  }

  const resetToEmptyState = () => {
    setMatters([])
    setChats([])
    chooseMatter('No matter — general query')
  }

  const promoteToChronology = (docName: string) => {
    setDocuments((current) =>
      current.map((doc) =>
        doc.name === docName ? { ...doc, category: 'case-record', inChronology: true } : doc,
      ),
    )
  }

  const cleanChatFiles = (targetMatter?: string) => {
    setDocuments((current) =>
      current.filter((doc) => {
        if (doc.category !== 'chat-attachment') return true
        if (targetMatter) return doc.matter !== targetMatter
        return false
      }),
    )
  }

  const toggleSidebar = () => {
    if (sidebarCollapsed) {
      setSidebarCollapsed(false)
      if (sidebarWidth < 200) setSidebarWidth(lastSidebarWidth || 280)
    } else {
      setSidebarCollapsed(true)
    }
  }

  const matterInitials = useMemo(
    () =>
      matter
        .split(' ')
        .slice(0, 2)
        .map((word) => word[0])
        .join(''),
    [matter],
  )
  const matterDocumentCount = useMemo(
    () => documents.filter((document) => document.matter === matter).length,
    [matter],
  )
  const isLibraryWorkspace = ['Documents', 'Global library'].includes(activeTool)
  const isNotesWorkspace = activeTool === 'Notes'
  const isHomeWorkspace = activeTool === 'Ask LawVriksh'
  const availableMatterFolders = useMemo(() => {
    const list = ['Asterix Precision Castings', 'Aarohan GridTech Solutions', 'Mobilox Innovations']
    const set = new Set<string>()
    matters.forEach((m) => { if (m && m !== 'No matter — general query') set.add(m) })
    documents.forEach((d) => {
      if (d.matter && d.matter !== 'No matter — general query') {
        set.add(d.matter)
      }
    })
    list.forEach((m) => set.add(m))
    return Array.from(set)
  }, [matters, documents])
  const workspaceDocuments = useMemo(
    () =>
      documents.filter((document) => {
        const matchesSearch = document.name.toLowerCase().includes(librarySearch.toLowerCase()) ||
          document.matter.toLowerCase().includes(librarySearch.toLowerCase())
        const matchesCategory = docCategoryTab === 'all' || document.category === docCategoryTab
        const targetMatter = activeTool === 'Global library'
          ? (selectedFolder === 'all' ? null : (selectedFolder === 'General Chat' ? 'No matter — general query' : selectedFolder))
          : matter
        const matchesFolder = targetMatter === null || document.matter === targetMatter
        return matchesSearch && matchesCategory && matchesFolder
      }),
    [activeTool, docCategoryTab, documents, librarySearch, matter, selectedFolder],
  )
  const visibleNotes = useMemo(
    () =>
      notes.filter((note) => {
        const matchesMatter = matter === 'No matter — general query' || note.matter === matter
        const searchValue = `${note.title} ${note.body}`.toLowerCase()
        return matchesMatter && searchValue.includes(noteSearch.toLowerCase())
      }),
    [matter, noteSearch, notes],
  )
  const selectedNote = visibleNotes.find((note) => note.id === selectedNoteId) ?? visibleNotes[0]

  const moreToolsList = [
    matterTools[0], // Overview
    matterTools[4], // Tabular review
    matterTools[5], // Drafts
    matterTools[6], // Notes
    matterTools[7], // Hearing prep
  ]
  const moreToolsActive = ['Overview', 'Tabular review', 'Drafts', 'Notes', 'Hearing prep'].includes(activeTool)

  function submitQuery(event: FormEvent) {
    event.preventDefault()
    if (!query.trim() && !attachedFile) return
    const message = query.trim() || `Review ${attachedFile}`
    setSubmittedQuery(message)
    if (activeChat) {
      setChats((current) =>
        current.map((chat) =>
          chat.id === activeChat
            ? {
              ...chat,
              title: chat.title === 'New matter chat' ? message.slice(0, 42) : chat.title,
              time: 'Now',
              updatedAt: Date.now(),
            }
            : chat,
        ),
      )
    } else {
      const id = `chat-${Date.now()}`
      setChats((current) => [
        { id, title: message.slice(0, 42), time: 'Now', matter, updatedAt: Date.now() },
        ...current,
      ])
      setActiveChat(id)
    }
    setQuery('')
    setAttachedFile('')
  }

  function goHome() {
    setActiveTool('Ask LawVriksh')
    setSidebarOpen(false)
    setMatterMoreOpen(false)
    setMatterMenuOpen(false)
    setPendingMatterTool('')
    window.setTimeout(() => {
      const el = document.querySelector<HTMLTextAreaElement>('#legal-query')
      if (el) {
        el.focus()
        el.selectionStart = el.selectionEnd = el.value.length
      }
    }, 0)
  }

  function startNewChat() {
    setActiveTool('Ask LawVriksh')
    setActiveChat('')
    setSubmittedQuery('')
    setQuery('')
    setAttachedFile('')
    setMatter('No matter — general query')
    setMatterMenuOpen(false)
    setPendingMatterTool('')
    setExpandedMatter('')
    setSidebarOpen(false)
    window.setTimeout(() => document.querySelector<HTMLTextAreaElement>('#legal-query')?.focus(), 0)
  }

  function createMatterChat(matterName: string) {
    setActiveTool('Ask LawVriksh')
    const id = `chat-${Date.now()}`
    setChats((current) => [
      { id, title: 'New matter chat', time: 'Now', matter: matterName, updatedAt: Date.now() },
      ...current,
    ])
    setMatter(matterName)
    setExpandedMatter(matterName)
    setActiveChat(id)
    setSubmittedQuery('')
    setQuery('')
    setMatterActions('')
    setSidebarOpen(false)
    window.setTimeout(() => document.querySelector<HTMLTextAreaElement>('#legal-query')?.focus(), 0)
  }

  function addMatter() {
    const name = window.prompt('Name this matter')
    if (!name?.trim() || matters.includes(name.trim())) return
    const newMatter = name.trim()
    setMatters((current) => [...current, newMatter])
    setMatter(newMatter)
    setExpandedMatter(newMatter)
    createMatterChat(newMatter)
  }

  function renameMatter(oldName: string) {
    const name = window.prompt('Rename matter', oldName)
    if (!name?.trim() || name.trim() === oldName) return
    const newName = name.trim()
    setMatters((current) => current.map((item) => item === oldName ? newName : item))
    setChats((current) => current.map((chat) => chat.matter === oldName ? { ...chat, matter: newName, time: 'Now', updatedAt: Date.now() } : chat))
    setPinnedMatters((current) => current.map((item) => item === oldName ? newName : item))
    if (matter === oldName) setMatter(newName)
    if (expandedMatter === oldName) setExpandedMatter(newName)
    setMatterActions('')
  }

  function selectChat(chat: MatterChat) {
    setActiveTool('Ask LawVriksh')
    const openedAt = Date.now()
    setChats((current) =>
      current.map((item) =>
        item.id === chat.id
          ? { ...item, time: 'Now', updatedAt: openedAt }
          : item,
      ),
    )
    setActiveChat(chat.id)
    setSubmittedQuery(chat.title)
    setMatter(chat.matter)
    setExpandedMatter(chat.matter)
    setChatActions('')
    setSidebarOpen(false)
  }

  function openMatterChatContext(matterName: string) {
    const mostRecentChat = [...chats]
      .filter((chat) => chat.matter === matterName)
      .sort((a, b) => b.updatedAt - a.updatedAt)[0]

    setMatterActions('')
    if (mostRecentChat) {
      selectChat(mostRecentChat)
    } else {
      createMatterChat(matterName)
    }
  }

  function renameChat(chat: MatterChat) {
    const title = window.prompt('Rename chat', chat.title)
    if (!title?.trim()) return
    setChats((current) => current.map((item) => item.id === chat.id ? { ...item, title: title.trim(), time: 'Now', updatedAt: Date.now() } : item))
    setChatActions('')
  }

  function moveChat(chat: MatterChat) {
    const destination = window.prompt(`Move to matter:\n${matters.join('\n')}`, chat.matter)
    if (!destination || !matters.includes(destination) || destination === chat.matter) return
    setChats((current) => current.map((item) => item.id === chat.id ? { ...item, matter: destination, time: 'Now', updatedAt: Date.now() } : item))
    if (activeChat === chat.id) setMatter(destination)
    setChatActions('')
  }

  function useSuggestion(text: string) {
    setQuery(text)
    document.querySelector<HTMLTextAreaElement>('#legal-query')?.focus()
  }

  function openTool(tool: (typeof matterTools)[number]) {
    if (
      ['Case mapping', 'Chronology'].includes(tool.title) &&
      matter === 'No matter — general query'
    ) {
      setPendingMatterTool(tool.title)
      setMatterMenuOpen(true)
      setMatterMoreOpen(false)
      setSidebarOpen(false)
      return
    }

    setActiveTool(tool.title)
    if (tool.title === 'Documents') {
      setFileScope('matter')
      setDrawerOpen(false)
    } else if (tool.prompt && !['Case mapping', 'Chronology', 'Notes'].includes(tool.title)) {
      if (!query.trim()) {
        useSuggestion(tool.prompt)
      }
    }
    setMatterMoreOpen(false)
    setSidebarOpen(false)
  }

  function openLibrary(scope: 'matter' | 'global') {
    setFileScope(scope)
    setActiveTool(scope === 'global' ? 'Global library' : 'Documents')
    setDrawerOpen(false)
    setMatterMoreOpen(false)
    setSidebarOpen(false)
    setLibrarySearch('')
  }

  function openPlaybooks() {
    setActiveTool('Playbooks')
    setMatterMoreOpen(false)
    setSidebarOpen(false)
    if (!query.trim()) {
      useSuggestion('Create a reusable legal playbook across firm matters and practice')
    }
  }

  function addSavedNote() {
    const id = `note-${Date.now()}`
    const newNote: SavedNote = {
      id,
      title: 'Untitled note',
      body: '',
      matter,
      updated: 'Now',
    }
    setNotes((current) => [newNote, ...current])
    setSelectedNoteId(id)
    setActiveTool('Notes')
  }

  function updateSavedNote(field: 'title' | 'body', value: string) {
    if (!selectedNote) return
    setNotes((current) =>
      current.map((note) =>
        note.id === selectedNote.id ? { ...note, [field]: value, updated: 'Now' } : note,
      ),
    )
  }

  function exportSelectedNote() {
    if (!selectedNote) return
    const blob = new Blob([`${selectedNote.title}\n\n${selectedNote.body}`], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${selectedNote.title || 'note'}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  function chooseMatter(matterName: string) {
    setMatter(matterName)
    setMatterMenuOpen(false)

    if (matterName === 'No matter — general query') {
      setPendingMatterTool('')
      setActiveChat('')
      setSubmittedQuery('')
      if (['Case mapping', 'Chronology'].includes(activeTool)) {
        setActiveTool('Ask LawVriksh')
      }
      return
    }

    if (pendingMatterTool) {
      setActiveTool(pendingMatterTool)
      setPendingMatterTool('')
      setSubmittedQuery('')
    } else if (isHomeWorkspace) {
      openMatterChatContext(matterName)
    }
  }



  return (
    <div className="app-shell">
      {sidebarOpen && <button aria-label="Close menu" className="mobile-scrim" onClick={() => setSidebarOpen(false)} />}

      <header
        className={`app-header ${(isHomeWorkspace || isLibraryWorkspace) && !sidebarCollapsed ? 'has-sidebar' : 'without-sidebar'} ${isResizing ? 'is-resizing' : ''}`}
        style={{
          '--matter-offset': sidebarCollapsed ? '180px' : `${sidebarWidth + 72}px`,
        } as React.CSSProperties}
      >
        <button
          type="button"
          className="header-brand-btn"
          onClick={goHome}
          title="LawVriksh Home"
        >
          <span className="header-brand-text">Law<span>Vriksh</span></span>
        </button>

        {sidebarCollapsed && isHomeWorkspace && (
          <span className="header-divider collapsed-divider" style={{ left: '120px' }} />
        )}

        {isHomeWorkspace || isLibraryWorkspace ? (
          <button
            aria-label={sidebarCollapsed ? 'Expand sidebar (⌘B)' : 'Collapse sidebar (⌘B)'}
            className={`icon-button header-sidebar-toggle ${sidebarCollapsed ? 'is-collapsed' : ''}`}
            onClick={toggleSidebar}
            style={{
              left: sidebarCollapsed ? '132px' : `${58 + sidebarWidth - 44}px`,
              transition: isResizing ? 'none' : 'left 220ms ease, background 0.15s ease, transform 0.15s ease, border-color 0.15s ease',
            }}
            title={sidebarCollapsed ? 'Expand sidebar (⌘B)' : 'Collapse sidebar (⌘B)'}
          >
            <Icon name={sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-toggle'} size={18} />
          </button>
        ) : (
          <button
            aria-label="Return to chat"
            className="icon-button header-home-button"
            onClick={goHome}
            style={{
              left: '132px',
            }}
            title="Return to chat"
          >
            <Icon name="home" size={18} />
          </button>
        )}

        <div className="header-matter-center">
          <div className="matter-switcher-wrap header-matter-switcher">
            <button className="matter-switcher" onClick={() => { setMatterMenuOpen(!matterMenuOpen); setMatterMoreOpen(false) }}>
              <span className="matter-avatar">
                {matter === 'No matter — general query' ? 'GQ' : <Icon name={matterIcons[matter] || 'briefcase'} size={15} />}
              </span>
              <span className="matter-copy">
                <small>Working in</small>
                <strong>{matter}</strong>
              </span>
              <Icon name="chevron" size={16} />
            </button>
            {matterMenuOpen && (
              <div className="matter-menu">
                <p>{pendingMatterTool ? `Select a matter for ${pendingMatterTool}` : 'Choose a matter'}</p>
                {(pendingMatterTool ? matters : [...matters, 'No matter — general query']).map((item) => (
                  <button
                    className={matter === item ? 'selected' : ''}
                    key={item}
                    onClick={() => chooseMatter(item)}
                  >
                    <span>
                      {item === 'No matter — general query' ? 'GQ' : <Icon name={matterIcons[item] || 'folder'} size={14} />}
                    </span>
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="app-header-actions">
          <div className="version-nav-pill">
            <span className="version-pill-label">UI:</span>
            <a href="/" className="ver-link" title="v1: Header sub-nav tabs">v1</a>
            <a href="/v2" className="ver-link" title="v2: 2-Tier sticky sub-nav">v2</a>
            <a href="/v3" className="ver-link" title="v3: Right dockable panel">v3</a>
            <a href="/v4" className="ver-link" title="v4: Floating action dock">v4</a>
            <a href="/v5" className="ver-link active" title="v5: Zero-state onboarding & integrated dock">v5</a>
          </div>
          <button
            type="button"
            className="header-tour-btn"
            onClick={() => { setShowTour(true); setTourStep(1) }}
            title="Take a quick 2-minute tour of LawVriksh"
          >
            <Icon name="spark" size={13} />
            <span>Tour</span>
          </button>
          <button
            aria-label={matter === 'No matter — general query' ? 'View all files' : `View files for ${matter}`}
            className="files-button"
            onClick={() => {
              setFileScope(matter === 'No matter — general query' ? 'global' : 'matter')
              setDrawerOpen(true)
            }}
            title={matter === 'No matter — general query' ? `View all ${documents.length} files` : `View ${matterDocumentCount} files in ${matter}`}
          >
            <Icon name="folder" size={17} />
            <span>Files</span>
            <b>{matter === 'No matter — general query' ? documents.length : matterDocumentCount}</b>
          </button>
        </div>
      </header>

      <nav aria-label="Workspace shortcuts" className="utility-rail">
        <div className="rail-actions rail-global-actions">
          <button
            className={isHomeWorkspace ? 'active' : ''}
            data-tooltip="Chat home"
            onClick={goHome}
          >
            <Icon name="home" />
          </button>
          <button className={activeTool === 'Global library' ? 'active' : ''} data-tooltip="Global library" onClick={() => openLibrary('global')}>
            <Icon name="library" />
          </button>
          <button className={activeTool === 'Playbooks' ? 'active' : ''} data-tooltip="Global playbooks" onClick={openPlaybooks}>
            <Icon name="briefcase" />
          </button>
          <button className={activeTool === 'Notes' ? 'active' : ''} data-tooltip="Saved notes" onClick={() => openTool(matterTools[6])}>
            <Icon name="note" />
          </button>
        </div>
        <div className="rail-footer">
          <div className="ai-usage-wrap">
            <button
              type="button"
              className="ai-usage-circle-btn"
              aria-label="AI usage: 74% used"
            >
              <svg className="ai-usage-svg" viewBox="0 0 36 36">
                <path
                  className="ai-usage-track"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="ai-usage-progress"
                  strokeDasharray="74, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="ai-usage-content">
                <span className="ai-usage-icon"><Icon name="spark" size={13} /></span>
                <span className="ai-usage-number">74%</span>
              </div>
            </button>
            <div className="ai-usage-hover-card" role="tooltip">
              <div className="ai-usage-hover-title">
                <div className="ai-usage-badge"><Icon name="spark" size={12} /><span>AI Usage</span></div>
                <span className="ai-usage-pct-pill">74%</span>
              </div>
              <div className="ai-usage-hover-bar">
                <div className="ai-usage-hover-fill" style={{ width: '74%' }} />
              </div>
              <div className="ai-usage-hover-meta">
                <span>740 / 1,000 credits</span>
                <span>Resets in 12d</span>
              </div>
            </div>
          </div>

          <button
            aria-expanded={profileMenuOpen}
            className={`rail-profile ${profileMenuOpen ? 'active' : ''}`}
            data-tooltip="Account"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            CO
          </button>
        </div>
        {profileMenuOpen && (
          <div className="rail-profile-menu">
            <div className="rail-profile-header">
              <span className="avatar">CO</span>
              <span><strong>COO</strong><small>Practice desk</small></span>
            </div>
            <button onClick={() => setProfileMenuOpen(false)}><Icon name="user" size={17} /><span>Profile</span></button>
            <button onClick={() => setProfileMenuOpen(false)}><Icon name="settings" size={17} /><span>Settings</span></button>
            <button onClick={() => setProfileMenuOpen(false)}><Icon name="spark" size={17} /><span>Plan & credits</span></button>
            <button onClick={() => { setProfileMenuOpen(false); useSuggestion('How can I get help using LawVriksh?') }}><Icon name="chat" size={17} /><span>Help centre</span></button>
          </div>
        )}
      </nav>

      <aside
        className={`sidebar ${sidebarOpen ? 'is-open' : ''} ${sidebarCollapsed ? 'is-collapsed' : ''} ${!isHomeWorkspace && !isLibraryWorkspace ? 'is-workspace-hidden' : ''} ${isResizing ? 'is-resizing' : ''}`}
        style={{
          width: sidebarCollapsed ? 0 : `${sidebarWidth}px`,
          flexBasis: sidebarCollapsed ? 0 : `${sidebarWidth}px`,
          minWidth: sidebarCollapsed ? 0 : `${sidebarWidth}px`,
          maxWidth: sidebarCollapsed ? 0 : `${sidebarWidth}px`,
        }}
      >
        {isLibraryWorkspace ? (
          <div className="library-sidebar-pane">
            <div className="library-sidebar-header">
              <div className="library-sidebar-heading">
                <Icon name="library" size={16} />
                <span>Document Library</span>
              </div>
            </div>

            <label className="sidebar-library-search">
              <Icon name="search" size={14} />
              <input
                onChange={(e) => setLibrarySearch(e.target.value)}
                placeholder="Search files..."
                value={librarySearch}
              />
              {librarySearch && (
                <button aria-label="Clear search" onClick={() => setLibrarySearch('')} type="button">
                  <Icon name="close" size={12} />
                </button>
              )}
            </label>

            <div className="library-sidebar-section">
              <div className="library-section-label">VIEWS</div>
              <div className="library-nav-list">
                <button
                  className={`library-nav-item ${selectedFolder === 'all' && docCategoryTab === 'all' ? 'active' : ''}`}
                  onClick={() => { setSelectedFolder('all'); setDocCategoryTab('all') }}
                  type="button"
                >
                  <Icon name="folder" size={15} />
                  <span>All Documents</span>
                  <span className="library-nav-badge">{documents.length}</span>
                </button>
                <button
                  className={`library-nav-item ${docCategoryTab === 'case-record' ? 'active' : ''}`}
                  onClick={() => setDocCategoryTab('case-record')}
                  type="button"
                >
                  <Icon name="briefcase" size={15} />
                  <span>Core Case Records</span>
                  <span className="library-nav-badge">{documents.filter((d) => d.category === 'case-record').length}</span>
                </button>
                <button
                  className={`library-nav-item ${docCategoryTab === 'chat-attachment' ? 'active' : ''}`}
                  onClick={() => setDocCategoryTab('chat-attachment')}
                  type="button"
                >
                  <Icon name="chat" size={15} />
                  <span>Chat Working Files</span>
                  <span className="library-nav-badge">{documents.filter((d) => d.category === 'chat-attachment').length}</span>
                </button>
              </div>
            </div>

            <div className="library-sidebar-section">
              <div className="library-section-label">
                <span>MATTER FOLDERS</span>
                {selectedFolder !== 'all' && (
                  <button
                    className="library-reset-folder-btn"
                    onClick={() => setSelectedFolder('all')}
                    type="button"
                  >
                    View All
                  </button>
                )}
              </div>
              <div className="library-folders-list">
                {availableMatterFolders.map((item) => {
                  const count = documents.filter((d) => d.matter === item).length
                  const isSelected = selectedFolder === item
                  return (
                    <div className={`library-folder-row ${isSelected ? 'active' : ''}`} key={item}>
                      <button
                        className="library-folder-select"
                        onClick={() => setSelectedFolder(isSelected ? 'all' : item)}
                        title={`Filter files for ${item}`}
                        type="button"
                      >
                        <span className="folder-icon-wrap">
                          <Icon name={matterIcons[item] || 'folder'} size={15} />
                        </span>
                        <span className="folder-item-title" title={item}>{item}</span>
                        <span className="folder-item-count">{count}</span>
                      </button>
                      <button
                        className="folder-chat-shortcut"
                        onClick={(e) => {
                          e.stopPropagation()
                          chooseMatter(item)
                        }}
                        title={`Open chat for ${item}`}
                        type="button"
                      >
                        <Icon name="chat" size={13} />
                      </button>
                    </div>
                  )
                })}

                <div className={`library-folder-row ${selectedFolder === 'General Chat' ? 'active' : ''}`}>
                  <button
                    className="library-folder-select"
                    onClick={() => setSelectedFolder(selectedFolder === 'General Chat' ? 'all' : 'General Chat')}
                    title="Ad-hoc chat uploads not assigned to a matter"
                    type="button"
                  >
                    <span className="folder-icon-wrap">
                      <Icon name="chat" size={15} />
                    </span>
                    <span className="folder-item-title">General Chat Uploads</span>
                    <span className="folder-item-count">{documents.filter((d) => d.matter === 'No matter — general query').length}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="library-sidebar-footer">
              <div className="library-storage-box">
                <div className="library-storage-info">
                  <span>Storage Quota</span>
                  <strong>2.4 / 12 GB</strong>
                </div>
                <div className="library-storage-track">
                  <div className="library-storage-fill" style={{ width: '20%' }} />
                </div>
                <button
                  className="btn-library-clean-files"
                  onClick={() => cleanChatFiles(selectedFolder === 'all' ? undefined : (selectedFolder === 'General Chat' ? 'No matter — general query' : selectedFolder))}
                  title="Purge temporary chat files to free quota"
                  type="button"
                >
                  <Icon name="close" size={11} />
                  <span>Clean temporary files</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-sidebar-pane">

            <div className="sidebar-top-bar">
              <button className="new-chat-button" onClick={startNewChat} title="New conversation (⌘N)">
                <span className="new-chat-icon"><Icon name="plus" size={16} /></span>
                <span>New conversation</span>
                <kbd className="new-chat-kbd">⌘N</kbd>
              </button>
              <button aria-label="Close navigation" className="icon-button mobile-only" onClick={() => setSidebarOpen(false)}>
                <Icon name="close" size={16} />
              </button>
            </div>

            <div className="projects-section">
              <div className="section-label">
                <span>Matters</span>
                <div>
                  <button aria-label="Search matters" onClick={() => { setMatterSearchOpen(!matterSearchOpen); setMatterSearch('') }}><Icon name="search" size={15} /></button>
                  <button aria-label="Add matter" onClick={addMatter}><Icon name="plus" size={16} /></button>
                </div>
              </div>
              {matterSearchOpen && (
                <label className="sidebar-search">
                  <Icon name="search" size={14} />
                  <input autoFocus onChange={(event) => setMatterSearch(event.target.value)} placeholder="Search matters" value={matterSearch} />
                  {matterSearch && <button aria-label="Clear matter search" onClick={() => setMatterSearch('')}><Icon name="close" size={13} /></button>}
                </label>
              )}
              {matters.length === 0 ? (
                <div className="sidebar-empty-state-card">
                  <p>No matters created yet. Create your first matter or load a sample case to explore legal tools.</p>
                  <button className="btn-sidebar-create" onClick={addMatter} type="button">
                    <Icon name="plus" size={14} />
                    <span>Create first matter</span>
                  </button>
                  <button className="btn-sidebar-create" style={{ marginTop: '6px' }} onClick={loadSampleData} type="button">
                    <Icon name="briefcase" size={14} />
                    <span>Load sample case</span>
                  </button>
                </div>
              ) : (
                <div className="project-list">
                  {[...matters]
                    .sort((a, b) => Number(pinnedMatters.includes(b)) - Number(pinnedMatters.includes(a)))
                    .filter((item) => item.toLowerCase().includes(matterSearch.toLowerCase()))
                    .map((item) => {
                      const matterChats = chats.filter((chat) => chat.matter === item)
                      const expanded = expandedMatter === item
                      return (
                        <div className="project-group" key={item}>
                          <div className={`project-row ${matter === item ? 'selected' : ''}`}>
                            <button
                              className="project-main"
                              onClick={() => {
                                openMatterChatContext(item)
                              }}
                            >
                              <span
                                className="matter-custom-icon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setIconPickerMatter(iconPickerMatter === item ? null : item)
                                  setMatterActions('')
                                }}
                                title="Click to change icon"
                              >
                                <Icon name={matterIcons[item] || 'folder'} size={16} />
                              </span>
                              <span className="project-name" title={item}>{item}</span>
                              {pinnedMatters.includes(item) && <b className="matter-pin" title="Pinned">•</b>}
                              <small>{matterChats.length}</small>
                            </button>
                            <button
                              aria-label={`Options for ${item}`}
                              className="row-more"
                              onClick={() => {
                                setMatterActions(matterActions === item ? '' : item)
                                setIconPickerMatter(null)
                              }}
                            >
                              •••
                            </button>
                          </div>

                          {matterActions === item && (
                            <div className="matter-context-menu">
                              <div className="matter-context-header">
                                <Icon name={matterIcons[item] || 'folder'} size={16} />
                                <span><strong>{item}</strong><small>{matterChats.length} chats</small></span>
                              </div>
                              <button onClick={() => { setIconPickerMatter(item); setMatterActions('') }}>
                                <Icon name="spark" size={16} /> Change icon
                              </button>
                              <button onClick={() => createMatterChat(item)}><Icon name="plus" size={16} /> New chat</button>
                              <button onClick={() => { setMatter(item); openLibrary('matter'); setMatterActions('') }}><Icon name="library" size={16} /> Matter files</button>
                              <button onClick={() => {
                                setPinnedMatters((current) => current.includes(item) ? current.filter((name) => name !== item) : [...current, item])
                                setChats((current) => current.map((chat) => chat.matter === item ? { ...chat, time: 'Now', updatedAt: Date.now() } : chat))
                                setMatterActions('')
                              }}>
                                <Icon name="pin" size={16} /> {pinnedMatters.includes(item) ? 'Unpin matter' : 'Pin matter'}
                              </button>
                              <button onClick={() => renameMatter(item)}><Icon name="settings" size={16} /> Rename matter</button>
                            </div>
                          )}

                          {iconPickerMatter === item && (
                            <div className="matter-icon-picker-flyout">
                              <div className="icon-picker-header">
                                <span>Choose matter icon</span>
                                <button onClick={() => setIconPickerMatter(null)} aria-label="Close picker"><Icon name="close" size={13} /></button>
                              </div>
                              <div className="icon-picker-grid">
                                {(['folder', 'briefcase', 'scale', 'shield', 'building', 'file', 'spark', 'clock', 'map', 'table', 'note', 'pin'] as IconName[]).map((iconKey) => (
                                  <button
                                    key={iconKey}
                                    className={`icon-picker-btn ${matterIcons[item] === iconKey ? 'selected' : ''}`}
                                    onClick={() => {
                                      setMatterIcons((current) => ({ ...current, [item]: iconKey }))
                                      setIconPickerMatter(null)
                                    }}
                                    title={iconKey}
                                    type="button"
                                  >
                                    <Icon name={iconKey} size={16} />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {expanded && (
                            <div className="matter-chat-list">
                              <button className="add-matter-chat" onClick={() => createMatterChat(item)}>
                                <Icon name="plus" size={14} /> New chat
                              </button>
                              {matterChats.map((chat) => (
                                <div className={`matter-chat-row ${activeChat === chat.id ? 'selected' : ''}`} key={chat.id}>
                                  <button className="matter-chat-main" onClick={() => selectChat(chat)}>
                                    <Icon name="chat" size={14} />
                                    <span title={chat.title}>{chat.title}</span>
                                    {chat.pinned && <b title="Pinned">•</b>}
                                  </button>
                                  <button
                                    aria-label={`Options for ${chat.title}`}
                                    className="row-more"
                                    onClick={() => setChatActions(chatActions === chat.id ? '' : chat.id)}
                                  >
                                    •••
                                  </button>
                                  {chatActions === chat.id && (
                                    <div className="chat-context-menu">
                                      <button onClick={() => renameChat(chat)}><Icon name="note" size={15} /> Rename</button>
                                      <button onClick={() => { setChats((current) => current.map((item) => item.id === chat.id ? { ...item, pinned: !item.pinned, time: 'Now', updatedAt: Date.now() } : item)); setChatActions('') }}>
                                        <Icon name="spark" size={15} /> {chat.pinned ? 'Unpin' : 'Pin'}
                                      </button>
                                      <button onClick={() => moveChat(chat)}><Icon name="folder" size={15} /> Move to matter</button>
                                      <button className="danger" onClick={() => { setChats((current) => current.filter((item) => item.id !== chat.id)); if (activeChat === chat.id) startNewChat(); setChatActions('') }}>
                                        <Icon name="close" size={15} /> Archive
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              )}
            </div>



            <div className="sidebar-section">
              <div className="section-label">
                <span>Recent</span>
                <button aria-label="Search conversations" onClick={() => { setRecentSearchOpen(!recentSearchOpen); setRecentSearch('') }}><Icon name="search" size={16} /></button>
              </div>
              {recentSearchOpen && (
                <label className="sidebar-search">
                  <Icon name="search" size={14} />
                  <input autoFocus onChange={(event) => setRecentSearch(event.target.value)} placeholder="Search recent chats" value={recentSearch} />
                  {recentSearch && <button aria-label="Clear recent search" onClick={() => setRecentSearch('')}><Icon name="close" size={13} /></button>}
                </label>
              )}
              {chats.length === 0 ? (
                <p className="sidebar-empty-hint">No recent conversations. Ask a question below to start chatting.</p>
              ) : (
                <div className="chat-list">
                  {[...chats]
                    .sort((a, b) =>
                      b.updatedAt - a.updatedAt ||
                      Number(Boolean(b.pinned)) - Number(Boolean(a.pinned))
                    )
                    .filter((chat) => `${chat.title} ${chat.matter}`.toLowerCase().includes(recentSearch.toLowerCase()))
                    .slice(0, 8)
                    .map((chat) => (
                      <div className="recent-chat-row" key={chat.id}>
                        <button onClick={() => selectChat(chat)}>
                          <span title={chat.title}>{chat.title}</span>
                          <small>{chat.matter} · {chat.time}</small>
                        </button>
                        <button
                          aria-label={`Options for ${chat.title}`}
                          className="row-more"
                          onClick={() => setChatActions(chatActions === `recent-${chat.id}` ? '' : `recent-${chat.id}`)}
                        >
                          •••
                        </button>
                        {chatActions === `recent-${chat.id}` && (
                          <div className="chat-context-menu recent-menu">
                            <button onClick={() => renameChat(chat)}><Icon name="note" size={15} /> Rename</button>
                            <button onClick={() => { setChats((current) => current.map((item) => item.id === chat.id ? { ...item, pinned: !item.pinned, time: 'Now', updatedAt: Date.now() } : item)); setChatActions('') }}>
                              <Icon name="spark" size={15} /> {chat.pinned ? 'Unpin' : 'Pin'}
                            </button>
                            <button onClick={() => moveChat(chat)}><Icon name="folder" size={15} /> Move to matter</button>
                            <button className="danger" onClick={() => { setChats((current) => current.filter((item) => item.id !== chat.id)); if (activeChat === chat.id) startNewChat(); setChatActions('') }}>
                              <Icon name="close" size={15} /> Archive
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>

          </div>
        )}
        <div
          className={`sidebar-resizer ${isResizing ? 'is-dragging' : ''}`}
          onDoubleClick={() => {
            setSidebarWidth(280)
            setSidebarCollapsed(false)
          }}
          onMouseDown={startResizing}
          title="Drag to resize · Drag left to collapse · Double-click to reset"
        >
          <div className="resizer-handle-line" />
        </div>
      </aside>

      <main className="main-panel">
        <section className={`workspace ${isHomeWorkspace && matter !== 'No matter — general query' && activeTool !== 'Global library' && activeTool !== 'Playbooks' && !dockMinimized ? 'has-dock-gutter' : ''} ${submittedQuery ? 'has-chat' : ''} ${['Chronology', 'Case mapping'].includes(activeTool) ? 'artifact-workspace-shell' : ''} ${isLibraryWorkspace ? 'library-workspace-shell' : ''} ${isNotesWorkspace ? 'notes-workspace-shell' : ''}`}>
          {isNotesWorkspace ? (
            <div className="notes-workspace">
              <div className="notes-toolbar">
                <div className="notes-breadcrumb">
                  <Icon name="folder" size={15} />
                  <strong>{matter}</strong>
                  <span>/</span>
                  <b>Notes</b>
                </div>
                <div>
                  <button className="add-note-button" onClick={addSavedNote}><Icon name="plus" size={16} /> Add note</button>
                  <button className="export-note-button" disabled={!selectedNote} onClick={exportSelectedNote}><Icon name="arrow" size={15} /> Export</button>
                </div>
              </div>

              <div className="notes-layout">
                <aside className="notes-list-panel">
                  <button className="notes-matter-button" onClick={() => setMatterMenuOpen(true)}>
                    <Icon name="folder" size={15} />
                    <span>{matter}</span>
                    <Icon name="chevron" size={14} />
                  </button>
                  <div className="notes-list-heading">
                    <span>Notes <b>{visibleNotes.length}</b></span>
                    <button aria-label="Add note" onClick={addSavedNote}><Icon name="plus" size={16} /></button>
                  </div>
                  <label className="notes-search">
                    <Icon name="search" size={16} />
                    <input onChange={(event) => setNoteSearch(event.target.value)} placeholder="Search notes..." value={noteSearch} />
                  </label>
                  <div className="notes-list">
                    {visibleNotes.map((note) => (
                      <button className={selectedNote?.id === note.id ? 'active' : ''} key={note.id} onClick={() => setSelectedNoteId(note.id)}>
                        <span>
                          <strong>{note.title || 'Untitled note'}</strong>
                          <small>{note.body || 'Start writing this note'}</small>
                        </span>
                        <time>{note.updated}</time>
                      </button>
                    ))}
                    {visibleNotes.length === 0 && <p>No notes found in this matter.</p>}
                  </div>
                </aside>

                <div className="note-editor">
                  {selectedNote ? (
                    <div className="note-editor-inner">
                      <div className="note-document-summary">
                        <strong>{selectedNote.title || 'Untitled note'}</strong>
                        <span>{selectedNote.updated} · 1 block</span>
                      </div>
                      <input
                        aria-label="Note title"
                        className="note-title-input"
                        onChange={(event) => updateSavedNote('title', event.target.value)}
                        value={selectedNote.title}
                      />
                      <div className="note-comment-block">
                        <label htmlFor="note-body">Comment</label>
                        <textarea
                          id="note-body"
                          onChange={(event) => updateSavedNote('body', event.target.value)}
                          placeholder="Your note on this matter..."
                          value={selectedNote.body}
                        />
                      </div>
                      <div className="note-block-picker">
                        <span>Add a block</span>
                        {[
                          ['Text', 'neutral'],
                          ['To-do', 'green'],
                          ['Argument', 'orange'],
                          ['Hearing', 'blue'],
                          ['Quote from a file', 'purple'],
                          ['Research', 'teal'],
                        ].map(([label, tone]) => (
                          <button
                            className={tone}
                            key={label}
                            onClick={() => updateSavedNote('body', `${selectedNote.body}${selectedNote.body ? '\n\n' : ''}${label}: `)}
                          >
                            <i /> {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="note-editor-empty">
                      <Icon name="note" size={25} />
                      <strong>Select or create a note</strong>
                      <span>Capture research, arguments, hearing points, and file quotes.</span>
                      <button onClick={addSavedNote}><Icon name="plus" size={15} /> Add note</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : isLibraryWorkspace ? (
            <div className="document-workspace">
              <div className="document-workspace-header minimal">
                <div className="doc-header-main">
                  <div className="doc-title-row">
                    <h1 className="doc-main-heading">
                      {selectedFolder === 'all' ? 'Global Library' : selectedFolder}
                    </h1>
                    <span className="doc-count-pill">
                      {workspaceDocuments.length} {workspaceDocuments.length === 1 ? 'file' : 'files'}
                    </span>
                    {selectedFolder !== 'all' && (
                      <button
                        className="btn-back-all-folders"
                        onClick={() => setSelectedFolder('all')}
                        type="button"
                      >
                        <Icon name="arrow" size={12} />
                        <span>All Folders</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="document-header-actions">
                  {selectedFolder !== 'all' && selectedFolder !== 'General Chat' && (
                    <button
                      className="btn-open-matter-chat"
                      onClick={() => chooseMatter(selectedFolder)}
                      title={`Open conversation for ${selectedFolder}`}
                      type="button"
                    >
                      <Icon name="chat" size={14} />
                      <span>Open Matter Chat</span>
                      <Icon name="arrow" size={12} />
                    </button>
                  )}
                  <button
                    className="upload-files-button sm"
                    onClick={() => {
                      const newName = `Contract Upload ${documents.length + 1}.pdf`
                      setDocuments((curr) => [
                        {
                          name: newName,
                          detail: '8 pages · Just now',
                          tone: 'green',
                          matter: selectedFolder === 'all' || selectedFolder === 'General Chat' ? (matter === 'No matter — general query' ? 'Asterix Precision Castings' : matter) : selectedFolder,
                          category: 'case-record',
                          size: '2.8 MB',
                          inChronology: true,
                        },
                        ...curr,
                      ])
                    }}
                    type="button"
                  >
                    <Icon name="plus" size={14} />
                    <span>Upload</span>
                  </button>
                </div>
              </div>

              {/* Folder Matrix Section with compact folder cards, real top tab lip, and search */}
              {activeTool === 'Global library' && (
                <div className="library-folders-overview">
                  <div className="folders-overview-header">
                    <div className="folders-title">
                      <Icon name="folder" size={15} />
                      <span>Folders ({availableMatterFolders.length + 1})</span>
                    </div>

                    <div className="folders-header-controls">
                      <label className="folder-matrix-search">
                        <Icon name="search" size={13} />
                        <input
                          onChange={(e) => setFolderSearch(e.target.value)}
                          placeholder="Filter folders..."
                          value={folderSearch}
                        />
                        {folderSearch && (
                          <button onClick={() => setFolderSearch('')} type="button">
                            <Icon name="close" size={11} />
                          </button>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="folders-scroll-container">
                    <div className="folders-cards-scroll">
                      {availableMatterFolders
                        .filter((item) => item.toLowerCase().includes(folderSearch.toLowerCase()))
                        .map((item) => {
                          const matterDocs = documents.filter((d) => d.matter === item)
                          const count = matterDocs.length
                          const isSelected = selectedFolder === item
                          return (
                            <div
                              className={`folder-overview-card ${isSelected ? 'is-selected' : ''}`}
                              key={item}
                              onClick={() => setSelectedFolder(isSelected ? 'all' : item)}
                            >
                              <div className="folder-card-top">
                                <span className="folder-card-icon-wrap">
                                  <Icon name={matterIcons[item] || 'folder'} size={15} />
                                </span>
                                <button
                                  className="folder-card-chat-action"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    chooseMatter(item)
                                  }}
                                  title={`Jump into chat for ${item}`}
                                  type="button"
                                >
                                  <span>Chat</span>
                                  <Icon name="arrow" size={10} />
                                </button>
                              </div>
                              <div className="folder-card-body">
                                <div className="folder-card-title" title={item}>{item}</div>
                                <div className="folder-card-meta">
                                  <span><strong>{count}</strong> {count === 1 ? 'file' : 'files'}</span>
                                  <span className="meta-dot">•</span>
                                  <span>{count > 0 ? matterDocs[0].size : '0 MB'}</span>
                                </div>
                              </div>
                            </div>
                          )
                        })}

                      {(!folderSearch || 'general chat'.includes(folderSearch.toLowerCase())) && (
                        <div
                          className={`folder-overview-card general-folder-card ${selectedFolder === 'General Chat' ? 'is-selected' : ''}`}
                          onClick={() => setSelectedFolder(selectedFolder === 'General Chat' ? 'all' : 'General Chat')}
                        >
                          <div className="folder-card-top">
                            <span className="folder-card-icon-wrap blue">
                              <Icon name="chat" size={15} />
                            </span>
                            <span className="general-folder-badge">Ad-hoc</span>
                          </div>
                          <div className="folder-card-body">
                            <div className="folder-card-title">General Chat Uploads</div>
                            <div className="folder-card-meta">
                              <span><strong>{documents.filter((d) => d.matter === 'No matter — general query').length}</strong> files</span>
                              <span className="meta-dot">•</span>
                              <span>Unlinked</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Clean Active Filter Banner */}
              {selectedFolder !== 'all' && (
                <div className="active-folder-banner">
                  <div className="active-banner-left">
                    <Icon name="folder" size={14} />
                    <span>Filtered by folder: <strong>{selectedFolder}</strong></span>
                  </div>
                  <button
                    className="btn-clear-folder-filter"
                    onClick={() => setSelectedFolder('all')}
                    type="button"
                  >
                    <Icon name="close" size={11} />
                    <span>Show All Matters ({documents.length} files)</span>
                  </button>
                </div>
              )}

              {/* Sub-Nav Pills Row with Category Filter & View Mode Switcher */}
              <div className="library-subnav-row">
                <div className="library-category-pills">
                  <button
                    className={`lib-cat-pill ${docCategoryTab === 'all' ? 'active' : ''}`}
                    onClick={() => setDocCategoryTab('all')}
                    type="button"
                  >
                    All Files <span className="pill-badge">{workspaceDocuments.length}</span>
                  </button>
                  <button
                    className={`lib-cat-pill ${docCategoryTab === 'case-record' ? 'active' : ''}`}
                    onClick={() => setDocCategoryTab('case-record')}
                    type="button"
                  >
                    Core Records <span className="pill-badge">{workspaceDocuments.filter((d) => d.category === 'case-record').length}</span>
                  </button>
                  <button
                    className={`lib-cat-pill ${docCategoryTab === 'chat-attachment' ? 'active' : ''}`}
                    onClick={() => setDocCategoryTab('chat-attachment')}
                    type="button"
                  >
                    Chat Uploads <span className="pill-badge">{workspaceDocuments.filter((d) => d.category === 'chat-attachment').length}</span>
                  </button>
                </div>

                <div className="library-view-switcher">
                  <button
                    className={`view-switch-btn ${libraryViewMode === 'table' ? 'active' : ''}`}
                    onClick={() => setLibraryViewMode('table')}
                    title="Table list view"
                    type="button"
                  >
                    <Icon name="table" size={14} />
                    <span>List</span>
                  </button>
                  <button
                    className={`view-switch-btn ${libraryViewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setLibraryViewMode('grid')}
                    title="Grid cards view"
                    type="button"
                  >
                    <Icon name="folder" size={14} />
                    <span>Grid</span>
                  </button>
                </div>
              </div>

              {/* Document Items: Table View */}
              {libraryViewMode === 'table' ? (
                <div className="document-table">
                  <div className="document-table-row document-table-head">
                    <span />
                    <span>Document</span>
                    <span>Category / Source</span>
                    <span>Size</span>
                    <span>Chronology Status</span>
                    <span>Action</span>
                  </div>
                  {workspaceDocuments.map((document) => {
                    const isProcessing = document.detail.includes('Processing')
                    const isCaseRecord = document.category === 'case-record'
                    return (
                      <div className="document-table-row" key={document.name}>
                        <button aria-label={`Select ${document.name}`} className="document-checkbox" />
                        <div className="document-name">
                          <span className={`file-icon ${document.tone}`}><Icon name="file" size={17} /></span>
                          <span><strong>{document.name}</strong><small>{document.detail.split(' · ')[0]}</small></span>
                        </div>
                        <span className="document-source">
                          <span className={`doc-cat-tag ${isCaseRecord ? 'case-record' : 'chat-upload'}`}>
                            {isCaseRecord ? 'Core Record' : 'Chat Upload'}
                          </span>
                          <small style={{ display: 'block', color: '#8c867c', marginTop: '2px' }}>
                            {activeTool === 'Global library' ? (document.matter === 'No matter — general query' ? 'General Chat' : document.matter) : (isCaseRecord ? 'Matter Core' : 'In Conversation')}
                          </small>
                        </span>
                        <span style={{ fontSize: '11.5px', color: '#686257' }}>{document.size}</span>
                        <span>
                          {document.inChronology ? (
                            <span className="chronology-active-tag"><Icon name="clock" size={13} /> Active in timeline</span>
                          ) : (
                            <button
                              className="btn-promote-chronology"
                              onClick={() => promoteToChronology(document.name)}
                              title="Add this chat attachment to official matter Chronology"
                              type="button"
                            >
                              <Icon name="plus" size={12} /> Add to Chronology
                            </button>
                          )}
                        </span>
                        <span className="document-action">
                          <button onClick={() => { setAttachedFile(document.name); setActiveTool('Ask LawVriksh'); setQuery(`Review ${document.name}`) }}>
                            {isProcessing ? 'View status' : 'Ask about file'}
                          </button>
                          <button aria-label={`More options for ${document.name}`}>•••</button>
                        </span>
                      </div>
                    )
                  })}
                  {workspaceDocuments.length === 0 && (
                    <div className="document-empty">
                      <Icon name="search" size={20} />
                      <strong>No files found</strong>
                      <span>Try another search or select a different folder.</span>
                    </div>
                  )}
                </div>
              ) : (
                /* Document Items: Grid Cards View with refined edges and clean tags */
                <div className="library-cards-grid">
                  {workspaceDocuments.map((document) => {
                    const isProcessing = document.detail.includes('Processing')
                    const isCaseRecord = document.category === 'case-record'
                    return (
                      <div className="document-grid-card" key={document.name}>
                        <div className="grid-card-preview">
                          <span className={`grid-file-icon ${document.tone}`}><Icon name="file" size={26} /></span>
                          <span className={`grid-cat-pill ${isCaseRecord ? 'case-record' : 'chat-upload'}`}>
                            {isCaseRecord ? 'Core Record' : 'Chat Upload'}
                          </span>
                        </div>
                        <div className="grid-card-body">
                          <strong className="grid-card-name" title={document.name}>{document.name}</strong>
                          <div className="grid-card-matter">
                            <Icon name="folder" size={13} />
                            <span>{document.matter === 'No matter — general query' ? 'General Chat' : document.matter}</span>
                          </div>
                          <div className="grid-card-meta">
                            <span>{document.detail.split(' · ')[0]}</span>
                            <span>•</span>
                            <span>{document.size}</span>
                          </div>
                        </div>
                        <div className="grid-card-actions">
                          <button
                            className="btn-grid-ask"
                            onClick={() => { setAttachedFile(document.name); setActiveTool('Ask LawVriksh'); setQuery(`Review ${document.name}`) }}
                            type="button"
                          >
                            <Icon name="spark" size={13} />
                            <span>{isProcessing ? 'Processing' : 'Ask about file'}</span>
                          </button>
                          {!document.inChronology && (
                            <button
                              className="btn-grid-chronology"
                              onClick={() => promoteToChronology(document.name)}
                              title="Add to Chronology"
                              type="button"
                            >
                              <Icon name="plus" size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  {workspaceDocuments.length === 0 && (
                    <div className="library-empty-grid">
                      <Icon name="file" size={26} />
                      <p>No documents found in this folder or search.</p>
                      <button onClick={() => { setSelectedFolder('all'); setLibrarySearch(''); setDocCategoryTab('all') }} type="button">
                        Show All Documents
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : activeTool === 'Chronology' ? (
            <div className="artifact-workspace">
              <div className="artifact-heading">
                <div>
                  <p className="eyebrow">Generated independently for this matter</p>
                  <h1>Chronology</h1>
                  <p>Events are rebuilt from documents linked to <strong>{matter}</strong>.</p>
                </div>
                <div className="artifact-heading-actions">
                  <button onClick={() => setMatterMenuOpen(true)}>Change matter</button>
                  <span className="artifact-status"><span /> Ready · {matterDocumentCount} {matterDocumentCount === 1 ? 'source' : 'sources'}</span>
                </div>
              </div>
              <div className="artifact-tabs">
                <button className="active">All events <b>5</b></button>
                <button>Hearings <b>2</b></button>
                <button>Filings <b>1</b></button>
                <button>Facts <b>2</b></button>
              </div>
              <div className="chronology-list">
                {[
                  ['02 Nov 2026', 'Hearing', 'Hearing before the Commercial Court', 'Confirmed'],
                  ['02 Oct 2026', 'Hearing', 'Review of readiness and witness materials', 'Confirmed'],
                  ['30 Sep 2026', 'Filing', 'Written statement and supporting documents filed', 'Indexed'],
                  ['08 Jul 2026', 'Fact', 'Supply agreement and delivery schedule recorded', 'Source linked'],
                ].map(([date, category, title, status]) => (
                  <div className="chronology-row" key={`${date}-${title}`}>
                    <time>{date}</time>
                    <span className="timeline-dot"><Icon name={category === 'Hearing' ? 'clock' : 'file'} size={14} /></span>
                    <div>
                      <span>{category}</span>
                      <strong>{title}</strong>
                      <small><Icon name="file" size={13} /> Generated from matter documents</small>
                    </div>
                    <b>{status}</b>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTool === 'Case mapping' ? (
            <div className="artifact-workspace case-map-workspace">
              <div className="artifact-heading">
                <div>
                  <p className="eyebrow">Generated independently for this matter</p>
                  <h1>Case mapping</h1>
                  <p>Parties, issues, evidence, and reliefs connected across <strong>{matter}</strong>.</p>
                </div>
                <div className="artifact-heading-actions">
                  <button onClick={() => setMatterMenuOpen(true)}>Change matter</button>
                  <span className="artifact-status"><span /> Live · {matterDocumentCount} {matterDocumentCount === 1 ? 'source' : 'sources'}</span>
                </div>
              </div>
              <div className="case-map-canvas">
                <div className="map-column">
                  {[
                    ['Parties', '4'],
                    ['Advocates', '2'],
                    ['Issues', '7'],
                    ['Legal provisions', '11'],
                  ].map(([label, count]) => (
                    <button key={label}><span>{count}</span>{label}<Icon name="chevron" size={14} /></button>
                  ))}
                </div>
                <div className="map-connector left-lines" />
                <div className="map-centre">
                  <span className="matter-avatar">{matterInitials}</span>
                  <small>Matter</small>
                  <strong>{matter}</strong>
                </div>
                <div className="map-connector right-lines" />
                <div className="map-column">
                  {[
                    ['Material facts', '9'],
                    ['Evidence', '3'],
                    ['Arguments', '5'],
                    ['Reliefs', '4'],
                  ].map(([label, count]) => (
                    <button key={label}><span>{count}</span>{label}<Icon name="chevron" size={14} /></button>
                  ))}
                </div>
              </div>
              <div className="artifact-note"><Icon name="spark" size={16} /> Adding a document to this matter refreshes only this case map and chronology.</div>
            </div>
          ) : (
            <>
              {!submittedQuery ? (
                <div className="welcome">
                  <div className="welcome-mark"><Icon name="spark" size={28} /></div>
                  <p className="eyebrow">{matter === 'No matter — general query' ? 'General Legal Workspace' : 'Your legal workspace'}</p>
                  <h1>What can I help you<br />work through?</h1>
                  <p className="welcome-copy">
                    {matter === 'No matter — general query'
                      ? 'Ask any legal question, draft principles, or review general queries. Select or create a matter from the sidebar to ground answers in case files.'
                      : 'Ask a question, review a document, or create a first draft. Everything stays grounded in your selected matter.'}
                  </p>

                  <div className="suggestion-grid">
                    {suggestions.map((suggestion) => (
                      <button key={suggestion.title} onClick={() => useSuggestion(suggestion.title)}>
                        <span className="suggestion-icon"><Icon name={suggestion.icon} size={18} /></span>
                        <span>
                          <strong>{suggestion.title}</strong>
                          <small>{suggestion.hint}</small>
                        </span>
                        <Icon name="arrow" size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="conversation">
                  <div className="user-message">{submittedQuery}</div>
                  <div className="assistant-message">
                    <div className="assistant-mark"><Icon name="spark" size={17} /></div>
                    <div>
                      <span className="thinking-label">Reviewing your matter</span>
                      <h2>I’ll help you with that.</h2>
                      <p>
                        I’m using the documents in <strong>{matter}</strong> to prepare a clear answer. I’ll separate confirmed facts from assumptions and flag anything that needs your review.
                      </p>
                      <div className="source-note"><Icon name="file" size={16} /> 3 relevant matter files found</div>
                    </div>
                  </div>
                </div>
              )}

              <form
                className={`composer ${isComposerDragActive ? 'is-dragging' : ''}`}
                onDragEnter={(event) => {
                  event.preventDefault()
                  setIsComposerDragActive(true)
                }}
                onDragLeave={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                    setIsComposerDragActive(false)
                  }
                }}
                onDragOver={(event) => {
                  event.preventDefault()
                  event.dataTransfer.dropEffect = 'copy'
                  setIsComposerDragActive(true)
                }}
                onDrop={(event) => {
                  event.preventDefault()
                  const fileName =
                    event.dataTransfer.getData('application/x-lawvriksh-document') ||
                    event.dataTransfer.files[0]?.name
                  if (fileName) {
                    setAttachedFile(fileName)
                    setDocuments((current) => {
                      if (current.some((d) => d.name === fileName)) return current
                      return [
                        {
                          name: fileName,
                          detail: 'Uploaded in chat',
                          tone: 'blue',
                          matter: matter,
                          category: 'chat-attachment',
                          size: '1.2 MB',
                          inChronology: false,
                        },
                        ...current,
                      ]
                    })
                  }
                  setIsComposerDragActive(false)
                }}
                onSubmit={submitQuery}
              >
                {attachedFile && (
                  <div className="composer-attachment">
                    <span className="file-icon blue"><Icon name="file" size={16} /></span>
                    <span>
                      <strong>{attachedFile}</strong>
                      <small>Attached from matter files</small>
                    </span>
                    <button aria-label={`Remove ${attachedFile}`} onClick={() => setAttachedFile('')} type="button">
                      <Icon name="close" size={15} />
                    </button>
                  </div>
                )}
                <textarea
                  aria-label="Ask a legal question"
                  id="legal-query"
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault()
                      event.currentTarget.form?.requestSubmit()
                    }
                  }}
                  placeholder="Ask anything about this matter..."
                  rows={2}
                  value={query}
                />
                <div className="composer-controls">
                  <div>
                    <button aria-label="Attach a document" className="attach-button" type="button"><Icon name="paperclip" size={18} /></button>
                    <button className="context-pill" onClick={() => { setFileScope('matter'); setDrawerOpen(true) }} type="button">
                      <span className="context-dot" />
                      {matter === 'No matter — general query' ? 'General' : 'Matter files'}
                    </button>
                  </div>
                  <button aria-label="Send message" className="send-button" disabled={!query.trim() && !attachedFile} type="submit">
                    <Icon name="arrow" size={19} />
                  </button>
                </div>
              </form>
              <p className="disclaimer">LawVriksh can make mistakes. Verify important legal information.</p>
            </>
          )}
        </section>
      </main>

      {isHomeWorkspace && matter !== 'No matter — general query' && activeTool !== 'Global library' && activeTool !== 'Playbooks' && (
        <aside aria-label="Quick matter tools dock" className={`floating-tools-dock-container ${dockMinimized ? 'is-minimized' : ''}`}>
          <button
            className="dock-collapse-trigger"
            onClick={() => setDockMinimized(!dockMinimized)}
            title={dockMinimized ? 'Expand tools dock' : 'Minimize tools dock'}
            type="button"
          >
            <Icon name={dockMinimized ? 'arrow' : 'close'} size={11} />
          </button>

          <div className="floating-tools-island">
            <div className="floating-matter-tag" title={matter}>
              <span>{matterInitials}</span>
            </div>

            <button
              className={`floating-dock-btn ${activeTool === 'Documents' ? 'active' : ''}`}
              data-label="Documents"
              onClick={() => openTool(matterTools[1])}
              title={`Documents (${matterDocumentCount})`}
              type="button"
            >
              <Icon name="folder" size={17} />
              <span className="floating-badge">{matterDocumentCount}</span>
            </button>

            <button
              className={`floating-dock-btn ${activeTool === 'Case mapping' ? 'active' : ''}`}
              data-label="Case mapping"
              onClick={() => openTool(matterTools[2])}
              title="Case mapping"
              type="button"
            >
              <Icon name="map" size={17} />
            </button>

            <button
              className={`floating-dock-btn ${activeTool === 'Chronology' ? 'active' : ''}`}
              data-label="Chronology"
              onClick={() => openTool(matterTools[3])}
              title="Chronology"
              type="button"
            >
              <Icon name="clock" size={17} />
            </button>

            <button
              className={`floating-dock-btn ${activeTool === 'Tabular review' ? 'active' : ''}`}
              data-label="Tabular review"
              onClick={() => openTool(matterTools[4])}
              title="Tabular review"
              type="button"
            >
              <Icon name="table" size={17} />
            </button>

            <button
              className={`floating-dock-btn ${activeTool === 'Notes' ? 'active' : ''}`}
              data-label="Notes"
              onClick={() => openTool(matterTools[6])}
              title="Matter notes"
              type="button"
            >
              <Icon name="note" size={17} />
            </button>

            <div className="floating-dock-divider" />

            <button
              className={`floating-dock-btn more-btn ${floatingDockExpanded ? 'active' : ''}`}
              data-label="More actions"
              onClick={() => setFloatingDockExpanded(!floatingDockExpanded)}
              title="More matter tools"
              type="button"
            >
              <Icon name="more" size={17} />
            </button>

            {floatingDockExpanded && (
              <div className="floating-dock-flyout">
                <div className="flyout-header">
                  <strong>More Matter Tools</strong>
                  <button onClick={() => setFloatingDockExpanded(false)} aria-label="Close flyout"><Icon name="close" size={14} /></button>
                </div>
                <div className="flyout-list">
                  <button onClick={() => { openTool(matterTools[7]); setFloatingDockExpanded(false) }}>
                    <Icon name="spark" size={16} />
                    <span>Hearing prep</span>
                  </button>
                  <button onClick={() => { openTool(matterTools[5]); setFloatingDockExpanded(false) }}>
                    <Icon name="file" size={16} />
                    <span>Drafts</span>
                  </button>
                  <button onClick={() => { openTool(matterTools[0]); setFloatingDockExpanded(false) }}>
                    <Icon name="briefcase" size={16} />
                    <span>Matter Overview</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}

      {drawerOpen && <button aria-label="Close files" className="drawer-scrim" onClick={() => setDrawerOpen(false)} />}
      <aside aria-hidden={!drawerOpen} className={`file-drawer ${drawerOpen ? 'is-open' : ''}`}>
        <div className="drawer-header">
          <div>
            <p className="eyebrow">{fileScope === 'global' ? 'Across every matter' : 'Matter context'}</p>
            <h2>{fileScope === 'global' ? 'Global library' : 'Matter files'}</h2>
          </div>
          <button aria-label="Close files" className="icon-button" onClick={() => setDrawerOpen(false)}><Icon name="close" /></button>
        </div>
        <div className="library-scope-tabs">
          <button className={fileScope === 'matter' ? 'active' : ''} onClick={() => setFileScope('matter')}>This matter</button>
          <button className={fileScope === 'global' ? 'active' : ''} onClick={() => setFileScope('global')}>All files</button>
        </div>

        {fileScope === 'matter' && (
          <div className="drawer-scope-tabs">
            <button
              className={`drawer-scope-tab ${drawerDocTab === 'case-record' ? 'active' : ''}`}
              onClick={() => setDrawerDocTab('case-record')}
              type="button"
            >
              Case Records ({documents.filter((d) => d.matter === matter && d.category === 'case-record').length})
            </button>
            <button
              className={`drawer-scope-tab ${drawerDocTab === 'chat-attachment' ? 'active' : ''}`}
              onClick={() => setDrawerDocTab('chat-attachment')}
              type="button"
            >
              Chat Files ({documents.filter((d) => d.matter === matter && d.category === 'chat-attachment').length})
            </button>
          </div>
        )}
        {fileScope === 'matter' && <div className="drawer-matter">
          <span className="matter-avatar">{matterInitials}</span>
          <div>
            <strong>{matter}</strong>
            <small>{documents.filter((document) => document.matter === matter).length} documents connected</small>
          </div>
        </div>}
        <div className="drawer-toolbar">
          <label>
            <Icon name="search" size={17} />
            <input placeholder="Search files" />
          </label>
          <button><Icon name="plus" size={17} /> Upload</button>
        </div>
        <div className="file-list">
          {documents
            .filter((document) => {
              if (fileScope === 'global') return true
              if (document.matter !== matter) return false
              return document.category === drawerDocTab
            })
            .map((document) => (
              <button
                draggable
                key={document.name}
                onDragEnd={() => setIsComposerDragActive(false)}
                onDragStart={(event) => {
                  event.dataTransfer.effectAllowed = 'copy'
                  event.dataTransfer.setData(
                    'text/plain',
                    `Review the document “${document.name}” from this matter`,
                  )
                  event.dataTransfer.setData(
                    'application/x-lawvriksh-document',
                    document.name,
                  )
                  window.setTimeout(() => {
                    setDrawerOpen(false)
                    setIsComposerDragActive(true)
                  }, 80)
                }}
                title="Drag this document into the AI composer"
              >
                <span className={`file-icon ${document.tone}`}><Icon name="file" size={18} /></span>
                <span>
                  <strong>{document.name}</strong>
                  <small>{document.detail}{fileScope === 'global' ? ` · ${document.matter}` : ''}</small>
                </span>
                <Icon name="chevron" size={15} />
              </button>
            ))}
        </div>
        <button className="view-all-button">
          {fileScope === 'global' ? 'All uploaded and generated files' : 'Open full matter library'} <Icon name="arrow" size={16} />
        </button>
        <div className="drawer-tip">
          <Icon name="spark" size={18} />
          <p><strong>Keep it simple</strong><span>Ask from here instead of switching between tools.</span></p>
        </div>
      </aside>
      {showTour && (
        <div className="tour-overlay" onClick={() => setShowTour(false)}>
          <div className="tour-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tour-header">
              <span className="tour-step-badge">Quick Tour · Step {tourStep} of 4</span>
              <button aria-label="Close tour" className="tour-close-btn" onClick={() => setShowTour(false)}>
                <Icon name="close" size={16} />
              </button>
            </div>

            <div className="tour-body">
              {tourStep === 1 && (
                <>
                  <div className="tour-step-icon-wrap"><Icon name="home" size={24} /></div>
                  <h3>Welcome to LawVriksh</h3>
                  <p>
                    LawVriksh is your AI-native legal workspace. You can use it in two distinct modes: <strong>General Query</strong> for fast ad-hoc research, or <strong>Matters</strong> for deep case-grounded work.
                  </p>
                  <div className="tour-tip-box">
                    <Icon name="spark" size={16} />
                    <span>General questions stay private and are never mixed with client matter files.</span>
                  </div>
                </>
              )}

              {tourStep === 2 && (
                <>
                  <div className="tour-step-icon-wrap"><Icon name="briefcase" size={24} /></div>
                  <h3>Matters Keep Work Grounded</h3>
                  <p>
                    Every client or dispute is organized as a <strong>Matter</strong>. When you upload contracts, briefs, or evidence to a matter, all answers cite exact paragraph references.
                  </p>
                  <div className="tour-tip-box">
                    <Icon name="folder" size={16} />
                    <span>Switch matters anytime from the top center switcher or the left sidebar.</span>
                  </div>
                </>
              )}

              {tourStep === 3 && (
                <>
                  <div className="tour-step-icon-wrap"><Icon name="table" size={24} /></div>
                  <h3>Automated Legal Intelligence Tools</h3>
                  <p>
                    Inside any matter, you have specialized tools docked on the right: <strong>Smart Chronology</strong> (auto-extracts dates), <strong>Case Mapping</strong> (maps arguments & claims), and <strong>Tabular Review</strong>.
                  </p>
                  <div className="tour-tip-box">
                    <Icon name="clock" size={16} />
                    <span>The right tool dock can be minimized anytime using the toggle arrow.</span>
                  </div>
                </>
              )}

              {tourStep === 4 && (
                <>
                  <div className="tour-step-icon-wrap"><Icon name="library" size={24} /></div>
                  <h3>Global Library & Firm Playbooks</h3>
                  <p>
                    Need to search across every matter at once? Use the <strong>Global Library</strong> on the leftmost utility rail. Use <strong>Playbooks</strong> to standardize dispute arguments across the practice.
                  </p>
                  <div className="tour-tip-box">
                    <Icon name="spark" size={16} />
                    <span>You're all set! Click below to explore a live sample case or start fresh.</span>
                  </div>
                </>
              )}
            </div>

            <div className="tour-footer">
              <div className="tour-dots">
                {[1, 2, 3, 4].map((step) => (
                  <span
                    className={`tour-dot ${tourStep === step ? 'active' : ''}`}
                    key={step}
                    onClick={() => setTourStep(step)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>

              <div className="tour-actions">
                <button
                  className="btn-tour-secondary"
                  onClick={() => setShowTour(false)}
                  type="button"
                >
                  Skip
                </button>
                {tourStep > 1 && (
                  <button
                    className="btn-tour-secondary"
                    onClick={() => setTourStep(tourStep - 1)}
                    type="button"
                  >
                    Back
                  </button>
                )}
                {tourStep < 4 ? (
                  <button
                    className="btn-tour-primary"
                    onClick={() => setTourStep(tourStep + 1)}
                    type="button"
                  >
                    Next <Icon name="arrow" size={14} />
                  </button>
                ) : (
                  <button
                    className="btn-tour-primary"
                    onClick={() => {
                      loadSampleData()
                      setShowTour(false)
                    }}
                    type="button"
                  >
                    Explore Sample Case <Icon name="arrow" size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showTour && (
        <div className="tour-overlay" onClick={() => setShowTour(false)}>
          <div className="tour-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tour-header">
              <span className="tour-step-badge">Quick Tour · Step {tourStep} of 4</span>
              <button aria-label="Close tour" className="tour-close-btn" onClick={() => setShowTour(false)}>
                <Icon name="close" size={16} />
              </button>
            </div>

            <div className="tour-body">
              {tourStep === 1 && (
                <>
                  <div className="tour-step-icon-wrap"><Icon name="home" size={24} /></div>
                  <h3>Welcome to LawVriksh</h3>
                  <p>
                    LawVriksh is your AI-native legal workspace. You can use it in two distinct modes: <strong>General Query</strong> for fast ad-hoc research, or <strong>Matters</strong> for deep case-grounded work.
                  </p>
                  <div className="tour-tip-box">
                    <Icon name="spark" size={16} />
                    <span>General questions stay private and are never mixed with client matter files.</span>
                  </div>
                </>
              )}

              {tourStep === 2 && (
                <>
                  <div className="tour-step-icon-wrap"><Icon name="briefcase" size={24} /></div>
                  <h3>Matters Keep Work Grounded</h3>
                  <p>
                    Every client or dispute is organized as a <strong>Matter</strong>. When you upload contracts, briefs, or evidence to a matter, all answers cite exact paragraph references.
                  </p>
                  <div className="tour-tip-box">
                    <Icon name="folder" size={16} />
                    <span>Switch matters anytime from the top center switcher or the left sidebar.</span>
                  </div>
                </>
              )}

              {tourStep === 3 && (
                <>
                  <div className="tour-step-icon-wrap"><Icon name="table" size={24} /></div>
                  <h3>Automated Legal Intelligence Tools</h3>
                  <p>
                    Inside any matter, you have specialized tools docked on the right: <strong>Smart Chronology</strong> (auto-extracts dates), <strong>Case Mapping</strong> (maps arguments & claims), and <strong>Tabular Review</strong>.
                  </p>
                  <div className="tour-tip-box">
                    <Icon name="clock" size={16} />
                    <span>The right tool dock can be minimized anytime using the toggle arrow.</span>
                  </div>
                </>
              )}

              {tourStep === 4 && (
                <>
                  <div className="tour-step-icon-wrap"><Icon name="library" size={24} /></div>
                  <h3>Global Library & Firm Playbooks</h3>
                  <p>
                    Need to search across every matter at once? Use the <strong>Global Library</strong> on the leftmost utility rail. Use <strong>Playbooks</strong> to standardize dispute arguments across the practice.
                  </p>
                  <div className="tour-tip-box">
                    <Icon name="spark" size={16} />
                    <span>You're all set! Click below to explore a live sample case or start fresh.</span>
                  </div>
                </>
              )}
            </div>

            <div className="tour-footer">
              <div className="tour-dots">
                {[1, 2, 3, 4].map((step) => (
                  <span
                    className={`tour-dot ${tourStep === step ? 'active' : ''}`}
                    key={step}
                    onClick={() => setTourStep(step)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>

              <div className="tour-actions">
                <button
                  className="btn-tour-secondary"
                  onClick={() => setShowTour(false)}
                  type="button"
                >
                  Skip
                </button>
                {tourStep > 1 && (
                  <button
                    className="btn-tour-secondary"
                    onClick={() => setTourStep(tourStep - 1)}
                    type="button"
                  >
                    Back
                  </button>
                )}
                {tourStep < 4 ? (
                  <button
                    className="btn-tour-primary"
                    onClick={() => setTourStep(tourStep + 1)}
                    type="button"
                  >
                    Next <Icon name="arrow" size={14} />
                  </button>
                ) : (
                  <button
                    className="btn-tour-primary"
                    onClick={() => {
                      loadSampleData()
                      setShowTour(false)
                    }}
                    type="button"
                  >
                    Explore Sample Case <Icon name="arrow" size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
