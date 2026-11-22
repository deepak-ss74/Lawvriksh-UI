'use client'

import { useCallback, useMemo, useRef, useState, type FormEvent } from 'react'

type IconName =
  | 'arrow'
  | 'briefcase'
  | 'building'
  | 'chat'
  | 'chat-plus'
  | 'chevron'
  | 'chevron-right'
  | 'clock'
  | 'close'
  | 'file'
  | 'folder'
  | 'globe'
  | 'grip'
  | 'home'
  | 'library'
  | 'lock'
  | 'map'
  | 'menu'
  | 'mic'
  | 'more'
  | 'more-vertical'
  | 'move'
  | 'note'
  | 'paperclip'
  | 'pin'
  | 'plus'
  | 'scale'
  | 'search'
  | 'settings'
  | 'share'
  | 'shield'
  | 'sidebar-collapsed'
  | 'sidebar-toggle'
  | 'spark'
  | 'table'
  | 'think'
  | 'trash'
  | 'tune'
  | 'user'

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
    building: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></>,
    chat: <path d="M21 14a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />,
    'chat-plus': <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M12 7v6M9 10h6" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    'chevron-right': <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    file: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v5h5M9 13h6M9 17h6" /></>,
    folder: <path d="M3 7h7l2 2h9v10H3z" />,
    globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
    grip: <><circle cx="8" cy="6" r="1.5" fill="currentColor" stroke="none" /><circle cx="16" cy="6" r="1.5" fill="currentColor" stroke="none" /><circle cx="8" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="16" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="8" cy="18" r="1.5" fill="currentColor" stroke="none" /><circle cx="16" cy="18" r="1.5" fill="currentColor" stroke="none" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
    library: <><path d="M4 4h4v16H4zM10 4h4v16h-4zM16 5l3-1 3 15-3 1z" /></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
    map: <><circle cx="7" cy="6" r="2" /><circle cx="17" cy="7" r="2" /><circle cx="12" cy="18" r="2" /><path d="M8.8 7 15 7M8 7.5l3 8.5M16 9l-3 7" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    mic: <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" /></>,
    more: <><circle cx="5" cy="12" r="1.7" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.7" fill="currentColor" stroke="none" /></>,
    'more-vertical': <><circle cx="12" cy="5" r="1.8" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" /><circle cx="12" cy="19" r="1.8" fill="currentColor" stroke="none" /></>,
    move: <><path d="m5 9-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" /></>,
    note: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 3v3M15 3v3M8 10h8M8 14h6" /></>,
    paperclip: <path d="m20 12-8.5 8.5a5 5 0 0 1-7-7L14 4a3 3 0 0 1 4 4l-9 9a1 1 0 0 1-2-2l8-8" />,
    pin: <><path d="m9 4 6 6" /><path d="m14 3 7 7-3 1-4 4-1 4-8-8 4-1 4-4z" /><path d="m8 16-5 5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    scale: <><path d="M12 3v18M6 7l6-3 6 3" /><path d="M3 13l3-6 3 6a3 3 0 0 1-6 0zM15 13l3-6 3 6a3 3 0 0 1-6 0z" /><path d="M9 21h6" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z" /></>,
    share: <><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    'sidebar-collapsed': <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 3v18" /><path d="m13 9 3 3-3 3" /></>,
    'sidebar-toggle': <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 3v18" /><path d="m15 9-3 3 3 3" /></>,
    spark: <><path d="m12 3 1.2 4.3a5 5 0 0 0 3.5 3.5L21 12l-4.3 1.2a5 5 0 0 0-3.5 3.5L12 21l-1.2-4.3a5 5 0 0 0-3.5-3.5L3 12l4.3-1.2a5 5 0 0 0 3.5-3.5z" /></>,
    table: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M3 15h18M9 4v16M15 4v16" /></>,
    think: <><path d="M9 18h6M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5h6.18z" /></>,
    trash: <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
    tune: <><path d="M4 8h8M16 8h4M4 16h4M12 16h8M12 5v6M8 13v6" /></>,
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

export type MatterChat = {
  id: string
  title: string
  time: string
  matter: string
  pinned?: boolean
  updatedAt: number
  query?: string
  thinkingLabel?: string
  responseHeading?: string
  responseParagraphs?: string[]
  sources?: string[]
  files?: string[]
}

export type SavedNote = {
  id: string
  title: string
  body: string
  matter: string
  updated: string
}

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

import {
  initialMatters,
  initialChats,
  initialDocuments,
  initialNotes,
  matterDetails,
  type MatterDetail,
} from './v4-sample-data'

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
  const [fileScope, setFileScope] = useState<'in-chat' | 'all' | 'matrix' | 'matter' | 'global'>('in-chat')
  const [drawerSearch, setDrawerSearch] = useState('')
  const [selectedMatrixMatter, setSelectedMatrixMatter] = useState<string | null>(null)
  const [allFilesLimit, setAllFilesLimit] = useState(12)
  const [newChatFiles, setNewChatFiles] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [matterMenuOpen, setMatterMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [matterMoreOpen, setMatterMoreOpen] = useState(false)
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false)
  const [pendingMatterTool, setPendingMatterTool] = useState('')
  const [activeTool, setActiveTool] = useState('Ask LawVriksh')
  const [allMattersSearch, setAllMattersSearch] = useState('')
  const [allMattersCategoryTab, setAllMattersCategoryTab] = useState<'All' | 'Litigation' | 'Arbitration' | 'Corporate & Regulatory' | 'IP & Tech'>('All')
  const [allMattersViewMode, setAllMattersViewMode] = useState<'grid' | 'table'>('grid')
  const [overviewInput, setOverviewInput] = useState('')
  const [matterHubTab, setMatterHubTab] = useState<'chats' | 'overview' | 'sources'>('chats')
  const [query, setQuery] = useState('')
  const [attachedFile, setAttachedFile] = useState('')
  const [isComposerDragActive, setIsComposerDragActive] = useState(false)
  const [activeChat, setActiveChat] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [matters, setMatters] = useState(initialMatters)
  const [chats, setChats] = useState(initialChats)
  const [expandedMatter, setExpandedMatter] = useState('Asterix Precision Castings')
  const [matterActions, setMatterActions] = useState('')
  const [chatActions, setChatActions] = useState('')
  const [pinnedMatters, setPinnedMatters] = useState<string[]>([])
  const [matterSearchOpen, setMatterSearchOpen] = useState(false)
  const [matterSearch, setMatterSearch] = useState('')
  const [mattersSectionOpen, setMattersSectionOpen] = useState(true)
  const [recentSearchOpen, setRecentSearchOpen] = useState(false)
  const [recentSearch, setRecentSearch] = useState('')
  const [recentSectionOpen, setRecentSectionOpen] = useState(true)
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
  const [matter, setMatter] = useState('Asterix Precision Castings')
  const [floatingDockExpanded, setFloatingDockExpanded] = useState(false)
  const [floatingDiscoveryOpen, setFloatingDiscoveryOpen] = useState(false)
  const [dockMinimized, setDockMinimized] = useState(false)
  const [dockMatter, setDockMatter] = useState<string | null>(null)
  const [dockPosition, setDockPosition] = useState<'right' | 'bottom' | 'left' | 'top'>('right')
  const [isDraggingDock, setIsDraggingDock] = useState(false)
  const [dockDragPos, setDockDragPos] = useState<{ x: number; y: number } | null>(null)
  const [snapTarget, setSnapTarget] = useState<'right' | 'bottom' | 'left' | 'top' | null>(null)
  const [positionMenuOpen, setPositionMenuOpen] = useState(false)

  const handleDockPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingDock(true)
    setDockDragPos({ x: e.clientX, y: e.clientY })

    const onPointerMove = (ev: PointerEvent) => {
      setDockDragPos({ x: ev.clientX, y: ev.clientY })
      const winW = window.innerWidth
      const winH = window.innerHeight
      const x = ev.clientX
      const y = ev.clientY

      if (y > winH - 130) {
        setSnapTarget('bottom')
      } else if (y < 130) {
        setSnapTarget('top')
      } else if (x < (sidebarCollapsed ? 180 : sidebarWidth + 140)) {
        setSnapTarget('left')
      } else {
        setSnapTarget('right')
      }
    }

    const onPointerUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      setIsDraggingDock(false)
      setDockDragPos(null)

      const winW = window.innerWidth
      const winH = window.innerHeight
      const x = ev.clientX
      const y = ev.clientY

      let target: 'right' | 'bottom' | 'left' | 'top' = 'right'
      if (y > winH - 130) {
        target = 'bottom'
      } else if (y < 130) {
        target = 'top'
      } else if (x < (sidebarCollapsed ? 180 : sidebarWidth + 140)) {
        target = 'left'
      } else {
        target = 'right'
      }

      setDockPosition(target)
      setSnapTarget(null)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }
  const [showTour, setShowTour] = useState(false)
  const [tourStep, setTourStep] = useState(1)
  const [sidebarWidth, setSidebarWidth] = useState(280)
  const [lastSidebarWidth, setLastSidebarWidth] = useState(280)
  const [isResizing, setIsResizing] = useState(false)
  const [isVerticalResizing, setIsVerticalResizing] = useState(false)
  const [mattersSplitPercent, setMattersSplitPercent] = useState<number | null>(null)
  const sidebarPaneRef = useRef<HTMLDivElement>(null)
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

  const startVerticalResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsVerticalResizing(true)

    const pane = sidebarPaneRef.current
    if (!pane) return
    const rect = pane.getBoundingClientRect()
    const totalHeight = rect.height

    const onMouseMove = (moveEvent: MouseEvent) => {
      const offsetY = moveEvent.clientY - rect.top
      const currentPercent = (offsetY / totalHeight) * 100
      // Clamped limits: min 28% for matters (~3-4 matters), max 65% for matters (~5-6 recent chats)
      const clamped = Math.min(Math.max(currentPercent, 28), 65)
      setMattersSplitPercent(clamped)
    }

    const onMouseUp = () => {
      setIsVerticalResizing(false)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.body.style.cursor = 'row-resize'
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
  const activeFloatingMatter = dockMatter || (matter !== 'No matter — general query' ? matter : (activeTool === 'All Matters' ? (matters[0] || 'Asterix Precision Castings') : null))

  const floatingMatterInitials = useMemo(
    () =>
      activeFloatingMatter
        ? activeFloatingMatter
            .split(' ')
            .slice(0, 2)
            .map((word) => word[0])
            .join('')
            .toUpperCase()
        : '',
    [activeFloatingMatter],
  )

  const floatingMatterDocumentCount = useMemo(
    () => (activeFloatingMatter ? documents.filter((document) => document.matter === activeFloatingMatter).length : 0),
    [activeFloatingMatter, documents],
  )
  const isLibraryWorkspace = ['Documents', 'Global library'].includes(activeTool)
  const isNotesWorkspace = activeTool === 'Notes'
  const isHomeWorkspace = activeTool === 'Ask LawVriksh'
  const isOverviewWorkspace = activeTool === 'Overview'
  const isAllMattersWorkspace = activeTool === 'All Matters'

  const currentMatterDetail: MatterDetail = useMemo(() => {
    return (
      matterDetails[matter] || {
        id: `matter-${matter}`,
        name: matter,
        formalTitle: `${matter} Commercial Proceeding`,
        court: 'Commercial Court / Arbitral Jurisdiction',
        advocate: 'Counsel on Record',
        category: 'Litigation',
        status: 'Active',
        latestDevelopment: {
          title: `Active Proceeding in ${matter}`,
          description: `Matter records and commercial filings are actively being managed under LawVriksh legal workspace.`,
          date: 'Recently updated',
          statusPill: 'Active',
        },
        milestones: {
          previous: { date: '20 Oct 2026', title: 'Evidentiary records filed' },
          current: { date: 'Today', title: 'Procedural readiness confirmed', relative: 'Active' },
          next: { date: 'Upcoming', title: 'Hearing on preliminary issues' },
        },
        nextHearing: {
          date: 'Under listing',
          detail: 'Listing before the bench / arbitral tribunal pending procedural calendar.',
          scheduled: false,
        },
        metrics: {
          docsToReview: 0,
          pendingTasks: 3,
          unresolvedFacts: 120,
          playbooks: 1,
        },
      }
    )
  }, [matter])

  const currentChat = useMemo(() => chats.find((c) => c.id === activeChat), [chats, activeChat])

  const currentChatFiles: string[] = useMemo(() => {
    if (!activeChat) {
      return newChatFiles
    }
    return currentChat?.files || []
  }, [activeChat, currentChat, newChatFiles])

  function attachFileToChat(fileName: string) {
    setAttachedFile(fileName)
    if (!activeChat) {
      setNewChatFiles((prev) => (prev.includes(fileName) ? prev : [...prev, fileName]))
    } else {
      setChats((current) =>
        current.map((c) =>
          c.id === activeChat
            ? { ...c, files: (c.files || []).includes(fileName) ? c.files : [...(c.files || []), fileName], updatedAt: Date.now() }
            : c,
        ),
      )
    }
  }

  function removeFileFromChat(fileName: string) {
    if (attachedFile === fileName) {
      setAttachedFile('')
    }
    if (!activeChat) {
      setNewChatFiles((prev) => prev.filter((f) => f !== fileName))
    } else {
      setChats((current) =>
        current.map((c) =>
          c.id === activeChat
            ? { ...c, files: (c.files || []).filter((f) => f !== fileName), updatedAt: Date.now() }
            : c,
        ),
      )
    }
  }

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const name = file.name
    const sizeKB = Math.round(file.size / 1024)
    const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`
    const ext = name.split('.').pop()?.toLowerCase() || ''
    const tone = ext === 'xlsx' || ext === 'csv' ? 'blue' : ext === 'docx' || ext === 'doc' ? 'orange' : 'green'

    const newDoc: AppDocument = {
      name,
      detail: `${sizeStr} · Just now`,
      tone,
      matter: matter === 'No matter — general query' ? 'General Legal Workspace' : matter,
      category: 'chat-attachment',
      size: sizeStr,
      inChronology: false,
    }

    setDocuments((curr) => [newDoc, ...curr])
    attachFileToChat(name)
    event.target.value = ''
  }

  function triggerQuickUploadPrompt() {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    } else {
      const fileName = window.prompt('Enter file name to upload/create (e.g. Settlement Agreement.pdf):')
      if (fileName?.trim()) {
        const clean = fileName.trim().includes('.') ? fileName.trim() : `${fileName.trim()}.pdf`
        const newDoc: AppDocument = {
          name: clean,
          detail: '1.2 MB · Just now',
          tone: 'green',
          matter: matter === 'No matter — general query' ? 'General Legal Workspace' : matter,
          category: 'chat-attachment',
          size: '1.2 MB',
          inChronology: false,
        }
        setDocuments((curr) => [newDoc, ...curr])
        attachFileToChat(clean)
      }
    }
  }

  function submitQueryWithMessage(msg: string) {
    setSubmittedQuery(msg)
    const id = `chat-${Date.now()}`
    const finalChatFiles = [...newChatFiles]
    if (attachedFile && !finalChatFiles.includes(attachedFile)) {
      finalChatFiles.push(attachedFile)
    }
    const newChat: MatterChat = {
      id,
      title: msg.slice(0, 42),
      time: 'Now',
      matter,
      updatedAt: Date.now(),
      query: msg,
      responseHeading: `Legal Assessment on: ${msg.slice(0, 40)}`,
      thinkingLabel: matter === 'No matter — general query' ? 'General Legal Analysis' : 'Matter Investigation',
      responseParagraphs: generateDynamicResponse(msg, matter),
      sources: [`${matter} Master Agreement.pdf`],
      files: finalChatFiles,
    }
    setChats((current) => [newChat, ...current])
    setActiveChat(id)
    setNewChatFiles([])
    setActiveTool('Ask LawVriksh')
  }
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

  function generateDynamicResponse(queryText: string, matterName: string, fileName?: string): string[] {
    const isGeneral = matterName === 'No matter — general query'
    return [
      isGeneral
        ? `Regarding your general legal inquiry on "${queryText}": Under Indian jurisprudence and governing statutory frameworks, this issue requires evaluating applicable statutory provisions, high court interpretations, and binding Supreme Court precedents.`
        : `In the matter of ${matterName}, regarding "${queryText}": We have reviewed the matter case records${fileName ? ` including ${fileName}` : ''} and contemporary correspondence to formulate a strategic assessment.`,
      `Primary Legal Framework: The substantive legal rights and contractual covenants must be analyzed in accordance with the Indian Contract Act, relevant special enactments, and procedural rules governing commercial dispute adjudication.`,
      `Evidentiary Evaluation: All documentary materials—including communications, purchase orders, performance logs, and statutory notices—must be cross-referenced against the timeline of events to identify material breaches and mitigation opportunities.`,
      `Risk Analysis & Counter-Arguments: The counter-party is likely to assert procedural defenses or contractual limitations of liability. However, established precedents support a robust prima facie claim provided the tripartite test of balance of convenience, irreparable harm, and clean hands is satisfied.`,
      `Strategic Next Steps: We recommend issuing a formal legal notice or filing an appropriate interlocutory petition before the competent forum within statutory limitation periods to safeguard commercial remedies.`
    ]
  }

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
              query: message,
              responseParagraphs: generateDynamicResponse(message, matter, attachedFile),
            }
            : chat,
        ),
      )
    } else {
      const id = `chat-${Date.now()}`
      setChats((current) => [
        {
          id,
          title: message.slice(0, 42),
          time: 'Now',
          matter,
          updatedAt: Date.now(),
          query: message,
          responseHeading: `Legal Strategy: ${message.slice(0, 40)}`,
          thinkingLabel: matter === 'No matter — general query' ? 'General Legal Analysis' : 'Matter Investigation',
          responseParagraphs: generateDynamicResponse(message, matter, attachedFile),
          sources: attachedFile ? [attachedFile] : undefined,
        },
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
    setNewChatFiles([])
    setDrawerSearch('')
    setSelectedMatrixMatter(null)
    setFileScope('in-chat')
    setMatter('No matter — general query')
    setDockMatter(null)
    setMatterMenuOpen(false)
    setHeaderMenuOpen(false)
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
    setActiveChat(chat.id)
    setSubmittedQuery(chat.query || chat.title)
    setMatter(chat.matter)
    setDockMatter(chat.matter !== 'No matter — general query' ? chat.matter : null)
    setExpandedMatter(chat.matter)
    setChatActions('')
    setHeaderMenuOpen(false)
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

  const matterClickTimerRef = useRef<{ [key: string]: NodeJS.Timeout | null }>({})

  function openMatterOverview(matterName: string, initialTab: 'chats' | 'overview' | 'sources' = 'chats') {
    setMatter(matterName)
    setExpandedMatter(matterName)
    setActiveTool('Overview')
    setMatterHubTab(initialTab)
    setMatterActions('')
    setSidebarOpen(false)
    setMatterMenuOpen(false)
  }

  function openAllMatters() {
    setActiveTool('All Matters')
    setMatterMoreOpen(false)
    setSidebarOpen(false)
    setMatterMenuOpen(false)
  }

  function handleMatterClick(item: string) {
    const isCurrentlyExpanded = expandedMatter === item

    if (isCurrentlyExpanded) {
      // When user clicks to close/collapse this matter in sidebar:
      // If we are currently in a non-matter general chat (or a different matter), automatically hide the dock!
      if (matter === 'No matter — general query' || matter !== item) {
        setDockMatter(null)
      }
    } else {
      // When user clicks to open/expand this matter:
      // Show the floating dock for this matter without auto-opening or switching active chat
      setDockMatter(item)
      setDockMinimized(false)
    }

    setIconPickerMatter(null)
    setMatterActions('')

    if (matterClickTimerRef.current[item]) {
      clearTimeout(matterClickTimerRef.current[item]!)
      matterClickTimerRef.current[item] = null
    }
    matterClickTimerRef.current[item] = setTimeout(() => {
      setExpandedMatter(isCurrentlyExpanded ? '' : item)
      matterClickTimerRef.current[item] = null
    }, 240)
  }

  function handleMatterDoubleClick(item: string) {
    if (matterClickTimerRef.current[item]) {
      clearTimeout(matterClickTimerRef.current[item]!)
      matterClickTimerRef.current[item] = null
    }
    // Double click: Open the Matter Hub (Screenshot 1)!
    openMatterOverview(item, 'chats')
    setExpandedMatter(item)
    setIconPickerMatter(null)
    setMatterActions('')
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
      ['Case mapping', 'Chronology', 'Overview'].includes(tool.title) &&
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
    } else if (tool.title === 'Overview') {
      setDrawerOpen(false)
    } else if (tool.prompt && !['Case mapping', 'Chronology', 'Notes', 'Overview'].includes(tool.title)) {
      if (!query.trim()) {
        useSuggestion(tool.prompt)
      }
    }
    setMatterMoreOpen(false)
    setSidebarOpen(false)
  }

  function openLibrary(scope: 'matter' | 'global' | 'in-chat' | 'all' | 'matrix') {
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
        className={`app-header ${(isHomeWorkspace || isLibraryWorkspace || isOverviewWorkspace) && !sidebarCollapsed ? 'has-sidebar' : 'without-sidebar'} ${isResizing ? 'is-resizing' : ''}`}
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

        {isHomeWorkspace || isLibraryWorkspace || isOverviewWorkspace ? (
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
          {currentChat && (
            <div className="header-chat-menu-wrap">
              <button
                className={`header-chat-menu-trigger ${headerMenuOpen ? 'is-open' : ''}`}
                onClick={() => setHeaderMenuOpen(!headerMenuOpen)}
                title="Conversation options"
                type="button"
              >
                {currentChat.matter && currentChat.matter !== 'No matter — general query' && (
                  <span className="header-chat-folder-icon">
                    <Icon name={matterIcons[currentChat.matter] || 'folder'} size={15} />
                  </span>
                )}
                <span className="header-chat-title-text">
                  {currentChat.title}
                </span>
                <span className="header-chat-chevron">
                  <Icon name="chevron" size={13} />
                </span>
              </button>

              {headerMenuOpen && (
                <>
                  <div className="header-chat-menu-backdrop" onClick={() => setHeaderMenuOpen(false)} />
                  <div className="header-chat-dropdown">
                    <button
                      className="header-dropdown-item"
                      onClick={() => {
                        renameChat(currentChat)
                        setHeaderMenuOpen(false)
                      }}
                      type="button"
                    >
                      <span className="dropdown-item-left">
                        <Icon name="note" size={14} />
                        <span>Rename</span>
                      </span>
                      <kbd className="dropdown-item-kbd">⌥⌘R</kbd>
                    </button>

                    <button
                      className="header-dropdown-item"
                      onClick={() => {
                        setChats((current) =>
                          current.map((item) =>
                            item.id === currentChat.id
                              ? { ...item, pinned: !item.pinned, time: 'Now', updatedAt: Date.now() }
                              : item
                          )
                        )
                        setHeaderMenuOpen(false)
                      }}
                      type="button"
                    >
                      <span className="dropdown-item-left">
                        <Icon name="pin" size={14} />
                        <span>{currentChat.pinned ? 'Unpin chat' : 'Pin chat'}</span>
                      </span>
                      <kbd className="dropdown-item-kbd">⌥⌘P</kbd>
                    </button>

                    <button
                      className="header-dropdown-item"
                      onClick={() => {
                        window.alert('Chat permissions locked to read-only.')
                        setHeaderMenuOpen(false)
                      }}
                      type="button"
                    >
                      <span className="dropdown-item-left">
                        <Icon name="lock" size={14} />
                        <span>Lock chat</span>
                      </span>
                    </button>

                    <div className="header-dropdown-divider" />

                    <button
                      className="header-dropdown-item"
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href)
                        window.alert('Conversation link copied to clipboard')
                        setHeaderMenuOpen(false)
                      }}
                      type="button"
                    >
                      <span className="dropdown-item-left">
                        <Icon name="globe" size={14} />
                        <span>Open on lawvriksh.com</span>
                      </span>
                    </button>

                    <div className="header-dropdown-divider" />

                    <button
                      className="header-dropdown-item"
                      onClick={() => {
                        setChats((current) => current.filter((item) => item.id !== currentChat.id))
                        startNewChat()
                        setHeaderMenuOpen(false)
                      }}
                      type="button"
                    >
                      <span className="dropdown-item-left">
                        <Icon name="file" size={14} />
                        <span>Archive</span>
                      </span>
                      <kbd className="dropdown-item-kbd">⇧⌘A</kbd>
                    </button>

                    <button
                      className="header-dropdown-item is-danger"
                      onClick={() => {
                        if (window.confirm(`Delete conversation "${currentChat.title}"?`)) {
                          setChats((current) => current.filter((item) => item.id !== currentChat.id))
                          startNewChat()
                          setHeaderMenuOpen(false)
                        }
                      }}
                      type="button"
                    >
                      <span className="dropdown-item-left">
                        <Icon name="trash" size={14} />
                        <span>Delete</span>
                      </span>
                    </button>

                    <div className="header-dropdown-divider" />

                    {currentChat.matter && currentChat.matter !== 'No matter — general query' ? (
                      <>
                        <div className="header-dropdown-section-label">
                          {currentChat.matter}
                        </div>
                        <button
                          className="header-dropdown-item"
                          onClick={() => {
                            moveChat(currentChat)
                            setHeaderMenuOpen(false)
                          }}
                          type="button"
                        >
                          <span className="dropdown-item-left">
                            <Icon name="folder" size={14} />
                            <span>Move to project</span>
                          </span>
                          <Icon name="chevron-right" size={13} />
                        </button>
                        <button
                          className="header-dropdown-item"
                          onClick={() => {
                            setChats((current) =>
                              current.map((item) =>
                                item.id === currentChat.id
                                  ? { ...item, matter: 'No matter — general query', updatedAt: Date.now() }
                                  : item
                              )
                            )
                            setMatter('No matter — general query')
                            setHeaderMenuOpen(false)
                          }}
                          type="button"
                        >
                          <span className="dropdown-item-left">
                            <Icon name="close" size={14} />
                            <span>Remove from project</span>
                          </span>
                        </button>
                      </>
                    ) : (
                      <button
                        className="header-dropdown-item"
                        onClick={() => {
                          moveChat(currentChat)
                          setHeaderMenuOpen(false)
                        }}
                        type="button"
                      >
                        <span className="dropdown-item-left">
                          <Icon name="folder" size={14} />
                          <span>Move to project</span>
                        </span>
                        <Icon name="chevron-right" size={13} />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="app-header-actions">
          <button
            aria-label={`Files in current conversation (${currentChatFiles.length})`}
            className="files-button"
            onClick={() => {
              setFileScope('in-chat')
              setDrawerOpen(true)
            }}
            title={activeChat ? `${currentChatFiles.length} files used in this conversation` : 'New conversation: 0 files in this chat'}
            type="button"
          >
            <Icon name="folder" size={17} />
            <span>Files</span>
            <b className={currentChatFiles.length === 0 ? 'is-zero' : 'has-files'}>{currentChatFiles.length}</b>
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
          <button
            className={activeTool === 'All Matters' ? 'active' : ''}
            data-tooltip="All Matters"
            onClick={openAllMatters}
          >
            <Icon name="briefcase" />
          </button>
          <button className={activeTool === 'Global library' ? 'active' : ''} data-tooltip="Global library" onClick={() => openLibrary('global')}>
            <Icon name="library" />
          </button>
          <button className={activeTool === 'Playbooks' ? 'active' : ''} data-tooltip="Global playbooks" onClick={openPlaybooks}>
            <Icon name="scale" />
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
        className={`sidebar ${sidebarOpen ? 'is-open' : ''} ${sidebarCollapsed ? 'is-collapsed' : ''} ${!isHomeWorkspace && !isLibraryWorkspace && !isOverviewWorkspace ? 'is-workspace-hidden' : ''} ${isResizing ? 'is-resizing' : ''}`}
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
          <div className={`chat-sidebar-pane ${isVerticalResizing ? 'is-vertical-resizing' : ''}`} ref={sidebarPaneRef}>

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

            <div
              className={`projects-section ${!mattersSectionOpen ? 'is-collapsed' : ''} ${matters.length === 0 ? 'is-empty-matters' : ''}`}
              style={mattersSectionOpen && matters.length > 0 && mattersSplitPercent ? { flex: `0 0 ${mattersSplitPercent}%`, maxHeight: `${mattersSplitPercent}%` } : undefined}
            >
              <div className="section-label">
                <button
                  className="section-label-btn"
                  onClick={() => setMattersSectionOpen(!mattersSectionOpen)}
                  type="button"
                >
                  <span className="section-label-text">Matters</span>
                  <span className={`section-chevron ${mattersSectionOpen ? 'open' : ''}`}>
                    <Icon name="chevron-right" size={12} />
                  </span>
                </button>
                <div className={`section-header-actions ${matterSearchOpen ? 'is-active' : ''}`}>
                  <button
                    aria-label="Filter/Search matters"
                    className="section-action-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMatterSearchOpen(!matterSearchOpen)
                      setMatterSearch('')
                    }}
                    title="Filter matters"
                    type="button"
                  >
                    <Icon name="tune" size={14} />
                  </button>
                  <button
                    aria-label="New matter"
                    className="section-action-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      addMatter()
                    }}
                    title="New matter"
                    type="button"
                  >
                    <Icon name="plus" size={14} />
                  </button>
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
                    <span>Create matter</span>
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
                      const matterChats = chats
                        .filter((chat) => chat.matter === item)
                        .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || b.updatedAt - a.updatedAt)
                      const displayedMatterChats = matterChats.slice(0, 10)
                      const expanded = expandedMatter === item
                      return (
                          <div className="project-group" key={item}>
                            <div className={`project-row ${matter === item ? 'selected' : ''}`}>
                              <button
                                className="project-main"
                                onClick={() => {
                                  handleMatterClick(item)
                                }}
                                onDoubleClick={() => {
                                  handleMatterDoubleClick(item)
                                }}
                                type="button"
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
                                <div className="title-scroll-container">
                                  <span className={`project-name ${item.length > 15 ? 'is-overflowing' : ''}`}>{item}</span>
                                </div>
                                {pinnedMatters.includes(item) && <b className="matter-pin" title="Pinned">•</b>}
                              </button>
                              <div className="project-row-actions">
                                <button
                                  aria-label={`Options for ${item}`}
                                  className="row-more"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setMatterActions(matterActions === item ? '' : item)
                                    setIconPickerMatter(null)
                                  }}
                                  title={`Options for ${item}`}
                                  type="button"
                                >
                                  <Icon name="more-vertical" size={13} />
                                </button>
                                <button
                                  aria-label={`New chat in ${item}`}
                                  className="matter-new-chat-btn"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    createMatterChat(item)
                                  }}
                                  title={`New chat in ${item}`}
                                  type="button"
                                >
                                  <Icon name="chat-plus" size={13} />
                                </button>
                              </div>
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
                      {displayedMatterChats.map((chat) => (
                        <div className={`matter-chat-row ${activeChat === chat.id ? 'selected' : ''}`} key={chat.id}>
                          <button className="matter-chat-main" onClick={() => selectChat(chat)} type="button">
                            <Icon name="chat" size={14} />
                            <div className="title-scroll-container">
                              <span className={`matter-chat-title ${chat.title.length > 16 ? 'is-overflowing' : ''}`}>{chat.title}</span>
                            </div>
                            {chat.pinned && <b title="Pinned">•</b>}
                          </button>
                          <div className="matter-chat-row-actions">
                            <button
                              aria-label={`Options for ${chat.title}`}
                              className="row-more"
                              onClick={(e) => {
                                e.stopPropagation()
                                setChatActions(chatActions === chat.id ? '' : chat.id)
                              }}
                              title={`Options for ${chat.title}`}
                              type="button"
                            >
                              <Icon name="more-vertical" size={13} />
                            </button>
                          </div>
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
                      {matterChats.length > 10 && (
                        <button
                          className="matter-chat-view-all-btn"
                          onClick={() => openMatterOverview(item, 'chats')}
                          title={`View all ${matterChats.length} conversations in ${item}`}
                          type="button"
                        >
                          <span className="view-all-text">View all {matterChats.length} chats</span>
                          <Icon name="chevron-right" size={12} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      )}
    </div>

    {mattersSectionOpen && recentSectionOpen && matters.length > 0 && (
      <div
        className={`sidebar-section-divider ${isVerticalResizing ? 'is-dragging' : ''}`}
        onDoubleClick={() => setMattersSplitPercent(null)}
        onMouseDown={startVerticalResizing}
        title="Drag up/down to adjust section height · Double-click to reset"
      >
        <div className="section-divider-handle" />
      </div>
    )}

    <div className={`sidebar-section ${!recentSectionOpen ? 'is-collapsed' : ''}`}>
      <div className="section-label">
        <button
          className="section-label-btn"
          onClick={() => setRecentSectionOpen(!recentSectionOpen)}
          type="button"
        >
          <span className="section-label-text">Recent</span>
          <span className={`section-chevron ${recentSectionOpen ? 'open' : ''}`}>
            <Icon name="chevron-right" size={12} />
          </span>
        </button>
        <div className={`section-header-actions ${recentSearchOpen ? 'is-active' : ''}`}>
          <button
            aria-label="Filter/Search recent chats"
            className="section-action-btn"
            onClick={(e) => {
              e.stopPropagation()
              setRecentSearchOpen(!recentSearchOpen)
              setRecentSearch('')
            }}
            title="Filter recent chats"
            type="button"
          >
            <Icon name="tune" size={14} />
          </button>
        </div>
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
            Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) ||
            b.updatedAt - a.updatedAt
          )
          .filter((chat) => `${chat.title} ${chat.matter}`.toLowerCase().includes(recentSearch.toLowerCase()))
          .slice(0, 30)
          .map((chat) => (
          <div className={`recent-chat-row ${activeChat === chat.id ? 'selected' : ''}`} key={chat.id}>
            <button onClick={() => selectChat(chat)}>
              <div className="title-scroll-container">
                <span className={`recent-chat-title ${chat.title.length > 18 ? 'is-overflowing' : ''}`}>{chat.title}</span>
              </div>
              <small>{chat.matter} · {chat.time}</small>
            </button>
            <div className="recent-chat-row-actions">
              <button
                aria-label={`Options for ${chat.title}`}
                className="row-more"
                onClick={() => setChatActions(chatActions === `recent-${chat.id}` ? '' : `recent-${chat.id}`)}
                title={`Options for ${chat.title}`}
                type="button"
              >
                <Icon name="more-vertical" size={13} />
              </button>
            </div>
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
        <section className={`workspace ${Boolean(activeFloatingMatter && activeTool !== 'Global library' && activeTool !== 'Playbooks' && !dockMinimized) ? `has-dock-gutter has-dock-gutter-${dockPosition}` : ''} ${submittedQuery ? 'has-chat' : ''} ${['Chronology', 'Case mapping', 'Overview', 'All Matters'].includes(activeTool) ? 'artifact-workspace-shell' : ''} ${isLibraryWorkspace ? 'library-workspace-shell' : ''} ${isNotesWorkspace ? 'notes-workspace-shell' : ''} ${activeTool === 'All Matters' ? 'all-matters-workspace-shell' : ''} ${activeTool === 'Overview' ? 'overview-workspace-shell' : ''}`}>
          {activeTool === 'All Matters' ? (
            <div className="all-matters-workspace">
              <div className="all-matters-header">
                <div className="all-matters-title-block">
                  <h1>All Matters</h1>
                  <p>Comprehensive portfolio overview of {matters.length} active legal matters, litigation proceedings, and arbitration workflows</p>
                </div>
                <div className="all-matters-actions">
                  <button className="btn-sidebar-create" onClick={addMatter} type="button">
                    <Icon name="plus" size={14} />
                    <span>New matter</span>
                  </button>
                </div>
              </div>

              <div className="all-matters-toolbar">
                <div className="all-matters-search-wrap">
                  <Icon name="search" size={15} />
                  <input
                    className="all-matters-search-input"
                    onChange={(e) => setAllMattersSearch(e.target.value)}
                    placeholder="Search matters by name, court, forum, or counsel..."
                    value={allMattersSearch}
                  />
                  {allMattersSearch && (
                    <button
                      onClick={() => setAllMattersSearch('')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
                      type="button"
                    >
                      <Icon name="close" size={12} />
                    </button>
                  )}
                </div>

                <div className="all-matters-tabs">
                  {[
                    { id: 'All', label: `All (${matters.length})` },
                    { id: 'Litigation', label: 'Litigation' },
                    { id: 'Arbitration', label: 'Arbitration' },
                    { id: 'Corporate & Regulatory', label: 'Corporate & Regulatory' },
                    { id: 'IP & Tech', label: 'IP & Tech' },
                  ].map((tab) => (
                    <button
                      className={`all-matters-tab ${allMattersCategoryTab === tab.id ? 'active' : ''}`}
                      key={tab.id}
                      onClick={() => setAllMattersCategoryTab(tab.id as any)}
                      type="button"
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="all-matters-view-toggle">
                  <button
                    className={`all-matters-toggle-btn ${allMattersViewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setAllMattersViewMode('grid')}
                    title="Grid view"
                    type="button"
                  >
                    <Icon name="table" size={14} />
                    <span>Grid</span>
                  </button>
                  <button
                    className={`all-matters-toggle-btn ${allMattersViewMode === 'table' ? 'active' : ''}`}
                    onClick={() => setAllMattersViewMode('table')}
                    title="Table view"
                    type="button"
                  >
                    <Icon name="library" size={14} />
                    <span>Table</span>
                  </button>
                </div>
              </div>

              {allMattersViewMode === 'grid' ? (
                <div className="all-matters-grid">
                  {matters
                    .filter((m) => {
                      const detail = matterDetails[m]
                      const query = allMattersSearch.toLowerCase()
                      const matchesSearch = !query ||
                        m.toLowerCase().includes(query) ||
                        (detail && (
                          detail.court.toLowerCase().includes(query) ||
                          detail.advocate.toLowerCase().includes(query) ||
                          detail.formalTitle.toLowerCase().includes(query) ||
                          detail.latestDevelopment.title.toLowerCase().includes(query)
                        ))
                      const matchesCategory = allMattersCategoryTab === 'All' ||
                        (detail && detail.category === allMattersCategoryTab)
                      return matchesSearch && matchesCategory
                    })
                    .map((m) => {
                      const detail = matterDetails[m]
                      const docCount = documents.filter((d) => d.matter === m).length
                      const chatCount = chats.filter((c) => c.matter === m).length
                      const statusClass = detail?.status?.toLowerCase().replace(/\s+/g, '-') || 'pending'
                      return (
                        <div className="all-matters-card" key={m} onClick={() => openMatterOverview(m)}>
                          <div className="all-matters-card-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span className="matter-avatar" style={{ width: 28, height: 28 }}>
                                <Icon name={matterIcons[m] || 'folder'} size={15} />
                              </span>
                              <span className="overview-type-badge">{detail?.category || 'Litigation'}</span>
                            </div>
                            <span className={`overview-status-pill ${statusClass}`}>
                              <span className="status-dot" />
                              {detail?.status || 'Pending'}
                            </span>
                          </div>

                          <div className="all-matters-card-body">
                            <h3 title={m}>{m}</h3>
                            <p className="matter-court" title={detail?.court}>{detail?.court || 'Commercial Court / High Court'}</p>
                          </div>

                          <div className="all-matters-card-metrics">
                            <div className="metric-col">
                              <span className="metric-label">Documents</span>
                              <span className="metric-val">{docCount}</span>
                            </div>
                            <div className="metric-col">
                              <span className="metric-label">Chats</span>
                              <span className="metric-val">{chatCount}</span>
                            </div>
                            <div className="metric-col">
                              <span className="metric-label">Unresolved facts</span>
                              <span className="metric-val">{detail?.metrics?.unresolvedFacts || 120}</span>
                            </div>
                          </div>

                          <div className="all-matters-card-footer">
                            <div className="footer-hearing">
                              <Icon name="clock" size={13} />
                              <span>{detail?.nextHearing?.date || 'Not scheduled'}</span>
                            </div>
                            <button
                              className="btn-open-overview"
                              onClick={(e) => {
                                e.stopPropagation()
                                openMatterOverview(m)
                              }}
                              type="button"
                            >
                              <span>Overview</span>
                              <Icon name="arrow" size={13} />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              ) : (
                <div className="all-matters-table-wrap">
                  <div className="all-matters-table-row all-matters-table-head">
                    <div>Matter Name</div>
                    <div>Forum / Court</div>
                    <div>Category</div>
                    <div>Status</div>
                    <div>Next Hearing</div>
                    <div style={{ textAlign: 'right' }}>Actions</div>
                  </div>
                  {matters
                    .filter((m) => {
                      const detail = matterDetails[m]
                      const query = allMattersSearch.toLowerCase()
                      const matchesSearch = !query ||
                        m.toLowerCase().includes(query) ||
                        (detail && (
                          detail.court.toLowerCase().includes(query) ||
                          detail.advocate.toLowerCase().includes(query) ||
                          detail.formalTitle.toLowerCase().includes(query)
                        ))
                      const matchesCategory = allMattersCategoryTab === 'All' ||
                        (detail && detail.category === allMattersCategoryTab)
                      return matchesSearch && matchesCategory
                    })
                    .map((m) => {
                      const detail = matterDetails[m]
                      const statusClass = detail?.status?.toLowerCase().replace(/\s+/g, '-') || 'pending'
                      return (
                        <div
                          className="all-matters-table-row"
                          key={m}
                          onClick={() => openMatterOverview(m)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Icon name={matterIcons[m] || 'folder'} size={15} />
                              <strong style={{ color: '#1a1714', fontSize: '13px' }}>{m}</strong>
                            </div>
                          </div>
                          <div style={{ color: '#686156', fontSize: '12px' }}>{detail?.court}</div>
                          <div><span className="overview-type-badge">{detail?.category || 'Litigation'}</span></div>
                          <div>
                            <span className={`overview-status-pill ${statusClass}`}>
                              <span className="status-dot" />
                              {detail?.status || 'Pending'}
                            </span>
                          </div>
                          <div style={{ color: '#686156', fontSize: '12px' }}>{detail?.nextHearing?.date || 'Not scheduled'}</div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                            <button
                              className="btn-overview-action"
                              onClick={(e) => {
                                e.stopPropagation()
                                openMatterOverview(m)
                              }}
                              style={{ padding: '4px 10px', fontSize: '11.5px' }}
                              type="button"
                            >
                              <Icon name="spark" size={12} />
                              <span>Overview</span>
                            </button>
                            <button
                              className="btn-overview-action"
                              onClick={(e) => {
                                e.stopPropagation()
                                chooseMatter(m)
                              }}
                              style={{ padding: '4px 8px', fontSize: '11.5px' }}
                              title="Open chat"
                              type="button"
                            >
                              <Icon name="chat" size={12} />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              )}
            </div>
          ) : activeTool === 'Overview' ? (
            <div className="matter-hub-workspace">
              {/* Header: Project / Matter Title & Collaborators (ChatGPT Projects style) */}
              <div className="matter-hub-header">
                <div className="matter-hub-title-row">
                  <div className="matter-hub-icon-wrap">
                    <Icon name={matterIcons[matter] || 'folder'} size={18} />
                  </div>
                  <h1 title={matter}>{matter}</h1>
                  <button
                    className="btn-overview-action"
                    onClick={openAllMatters}
                    style={{ padding: '3px 9px', fontSize: '11px', borderRadius: '6px' }}
                    title="Back to All Matters"
                    type="button"
                  >
                    <Icon name="briefcase" size={12} />
                    <span>All Matters</span>
                  </button>
                </div>

                <div className="matter-hub-header-actions">
                  <div className="matter-hub-avatars" title="Practice team members on this matter">
                    <span className="matter-hub-avatar-circle" style={{ background: '#2563eb' }}>DK</span>
                    <span className="matter-hub-avatar-circle" style={{ background: '#8b5cf6' }}>TG</span>
                    <span className="matter-hub-avatar-circle" style={{ background: '#a64927' }}>CO</span>
                  </div>

                  <button
                    className="btn-matter-hub-share"
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href)
                        alert(`Matter link for "${matter}" copied to clipboard!`)
                      }
                    }}
                    title="Share this matter"
                    type="button"
                  >
                    <Icon name="share" size={13} />
                    <span>Share</span>
                  </button>

                  <button
                    className="btn-matter-hub-more"
                    onClick={() => setMatterActions(matterActions === matter ? '' : matter)}
                    title="Matter options"
                    type="button"
                  >
                    <Icon name="more" size={14} />
                  </button>
                </div>
              </div>

              {/* Elevated Prominent Composer: + New chat in [Matter Name] */}
              <form
                className="matter-hub-composer"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!overviewInput.trim()) return
                  const msg = overviewInput.trim()
                  setOverviewInput('')
                  submitQueryWithMessage(msg)
                }}
              >
                <button
                  aria-label="Add file attachment"
                  className="composer-plus-btn"
                  onClick={() => {
                    setFileScope('matter')
                    setDrawerOpen(true)
                  }}
                  title="Attach file"
                  type="button"
                >
                  <Icon name="plus" size={16} />
                </button>

                <input
                  aria-label={`New chat in ${matter}`}
                  className="matter-hub-composer-input"
                  onChange={(e) => setOverviewInput(e.target.value)}
                  placeholder={`+ New chat in ${matter}`}
                  value={overviewInput}
                />

                <div className="composer-right-controls">
                  <button
                    className="composer-think-pill"
                    onClick={() => setOverviewInput((prev) => prev ? `${prev} (In-depth analysis)` : 'In-depth statutory assessment')}
                    title="Deep legal reasoning mode"
                    type="button"
                  >
                    <Icon name="think" size={13} />
                    <span>Think</span>
                  </button>

                  <button
                    aria-label="Voice input"
                    className="composer-icon-btn"
                    onClick={() => alert('Voice input listening... speak your legal query.')}
                    title="Voice input"
                    type="button"
                  >
                    <Icon name="mic" size={15} />
                  </button>

                  <button
                    aria-label="Send query to start new chat"
                    className="composer-submit-btn"
                    disabled={!overviewInput.trim()}
                    type="submit"
                  >
                    <Icon name="arrow" size={16} />
                  </button>
                </div>
              </form>

              {/* Sub-Navigation Tabs: Chats, Sources, Overview */}
              {(() => {
                const matterChats = chats.filter((c) => c.matter === matter)
                const matterDocs = documents.filter((d) => d.matter === matter)
                return (
                  <>
                    <div className="matter-hub-tabs-row">
                      <button
                        className={`matter-hub-tab-btn ${matterHubTab === 'chats' ? 'active' : ''}`}
                        onClick={() => setMatterHubTab('chats')}
                        type="button"
                      >
                        <span>Chats</span>
                        <span className="matter-hub-tab-badge">({matterChats.length})</span>
                      </button>

                      <button
                        className={`matter-hub-tab-btn ${matterHubTab === 'sources' ? 'active' : ''}`}
                        onClick={() => setMatterHubTab('sources')}
                        type="button"
                      >
                        <span>Sources</span>
                        <span className="matter-hub-tab-badge">({matterDocs.length})</span>
                      </button>

                      <button
                        className={`matter-hub-tab-btn ${matterHubTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setMatterHubTab('overview')}
                        type="button"
                      >
                        <Icon name="spark" size={13} />
                        <span>Overview</span>
                      </button>
                    </div>

                    {/* Tab 1: Chats History List (Exact ChatGPT Project layout) */}
                    {matterHubTab === 'chats' && (
                      <div className="matter-hub-chat-list">
                        {matterChats.map((chat, idx) => {
                          const avatarColors = ['blue', 'purple', 'terracotta', 'green']
                          const avatarInitials = ['DK', 'TG', 'CO', 'LV']
                          const color = avatarColors[idx % avatarColors.length]
                          const initials = avatarInitials[idx % avatarInitials.length]
                          const snippet = chat.responseParagraphs?.[0] || chat.query || 'Comprehensive legal review and case strategy.'
                          return (
                            <div
                              className="matter-hub-chat-row"
                              key={chat.id}
                              onClick={() => selectChat(chat)}
                            >
                              <div className={`matter-hub-chat-avatar ${color}`}>
                                {initials}
                              </div>

                              <div className="matter-hub-chat-content">
                                <div className="matter-hub-chat-title">
                                  <span>{chat.title}</span>
                                  {chat.pinned && <b className="matter-pin" title="Pinned">•</b>}
                                </div>
                                <div className="matter-hub-chat-snippet" title={snippet}>
                                  {snippet}
                                </div>
                              </div>

                              <div className="matter-hub-chat-meta">
                                <span className="matter-hub-chat-date">{chat.time}</span>
                                <button
                                  aria-label="Chat options"
                                  className="matter-hub-chat-options"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setChatActions(chatActions === chat.id ? '' : chat.id)
                                  }}
                                  type="button"
                                >
                                  <Icon name="more" size={13} />
                                </button>
                                {chatActions === chat.id && (
                                  <div className="chat-context-menu" style={{ right: 0, top: '28px' }}>
                                    <button onClick={(e) => { e.stopPropagation(); renameChat(chat) }}>
                                      <Icon name="note" size={15} /> Rename
                                    </button>
                                    <button onClick={(e) => {
                                      e.stopPropagation()
                                      setChats((current) => current.map((item) => item.id === chat.id ? { ...item, pinned: !item.pinned } : item))
                                      setChatActions('')
                                    }}>
                                      <Icon name="spark" size={15} /> {chat.pinned ? 'Unpin' : 'Pin'}
                                    </button>
                                    <button className="danger" onClick={(e) => {
                                      e.stopPropagation()
                                      setChats((current) => current.filter((item) => item.id !== chat.id))
                                      if (activeChat === chat.id) startNewChat()
                                      setChatActions('')
                                    }}>
                                      <Icon name="close" size={15} /> Archive
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                        {matterChats.length === 0 && (
                          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#888' }}>
                            <p>No conversations in this matter yet.</p>
                            <button
                              className="btn-sidebar-create"
                              onClick={() => createMatterChat(matter)}
                              style={{ margin: '10px auto' }}
                              type="button"
                            >
                              <Icon name="plus" size={14} />
                              <span>Start first conversation</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tab 2: Sources Tab */}
                    {matterHubTab === 'sources' && (
                      <div className="matter-hub-sources-pane" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                          <span style={{ fontSize: '13px', color: '#666' }}>{matterDocs.length} files attached to {matter}</span>
                          <button
                            className="btn-overview-action primary"
                            onClick={() => {
                              setFileScope('matter')
                              setDrawerOpen(true)
                            }}
                            type="button"
                          >
                            <Icon name="plus" size={13} />
                            <span>Upload document</span>
                          </button>
                        </div>
                        <div className="all-matters-table-wrap">
                          <div className="all-matters-table-row all-matters-table-head" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
                            <div>File Name</div>
                            <div>Category</div>
                            <div>Size</div>
                            <div>Uploaded</div>
                          </div>
                          {matterDocs.map((doc) => (
                            <div className="all-matters-table-row" key={doc.name} style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Icon name="file" size={14} />
                                <strong>{doc.name}</strong>
                              </div>
                              <div><span className="overview-type-badge">{doc.category}</span></div>
                              <div style={{ color: '#666' }}>{doc.size}</div>
                              <div style={{ color: '#666' }}>{doc.detail}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tab 3: Detailed Matter Overview */}
                    {matterHubTab === 'overview' && (
                      <div className="overview-workspace" style={{ padding: 0 }}>
                        {/* Title & Court Heading */}
                        <div className="overview-header-main">
                          <div className="overview-title-block">
                            <h1>{currentMatterDetail.formalTitle}</h1>
                            <p className="overview-subtitle">
                              {currentMatterDetail.court} · Represented by {currentMatterDetail.advocate}
                            </p>
                            <div className="overview-badges-row">
                              <span className="overview-type-badge">
                                <Icon name="scale" size={12} />
                                <span style={{ marginLeft: '4px' }}>{currentMatterDetail.category}</span>
                              </span>
                              <span className={`overview-status-pill ${currentMatterDetail.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                <span className="status-dot" />
                                {currentMatterDetail.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Hero Grid: Latest Development & Next Hearing */}
                        <div className="overview-hero-grid">
                          {/* Left Card: Latest Development */}
                          <div className="overview-card">
                            <div>
                              <div className="overview-card-header">
                                <span className="overview-card-eyebrow">
                                  <span className="status-dot" style={{ background: '#d9532f' }} />
                                  Latest Development
                                </span>
                                <span className={`overview-status-pill ${currentMatterDetail.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                  {currentMatterDetail.latestDevelopment.statusPill}
                                </span>
                              </div>

                              <h3>{currentMatterDetail.latestDevelopment.title}</h3>
                              <p className="overview-card-body">{currentMatterDetail.latestDevelopment.description}</p>

                              {/* Milestone Stepper */}
                              <div className="overview-milestone-stepper">
                                <div className="stepper-step">
                                  <span className="step-label">PREVIOUS</span>
                                  <strong className="step-date">{currentMatterDetail.milestones.previous.date}</strong>
                                  <span className="step-desc" title={currentMatterDetail.milestones.previous.title}>{currentMatterDetail.milestones.previous.title}</span>
                                </div>
                                <div className="stepper-line" />
                                <div className="stepper-step active">
                                  <span className="step-label">CURRENT</span>
                                  <strong className="step-date">{currentMatterDetail.milestones.current.date}</strong>
                                  <span className="step-desc" title={currentMatterDetail.milestones.current.title}>{currentMatterDetail.milestones.current.title}</span>
                                </div>
                                <div className="stepper-line" />
                                <div className="stepper-step">
                                  <span className="step-label">NEXT</span>
                                  <strong className="step-date">{currentMatterDetail.milestones.next.date}</strong>
                                  <span className="step-desc" title={currentMatterDetail.milestones.next.title}>{currentMatterDetail.milestones.next.title}</span>
                                </div>
                              </div>
                            </div>

                            <div className="overview-card-footer">
                              <span>
                                <Icon name="clock" size={13} />
                                <span style={{ marginLeft: '5px' }}>{currentMatterDetail.latestDevelopment.date}</span>
                              </span>
                              <button
                                className="btn-card-link"
                                onClick={() => openTool(matterTools[3])}
                                type="button"
                              >
                                <span>Open chronology</span>
                                <Icon name="arrow" size={13} />
                              </button>
                            </div>
                          </div>

                          {/* Right Card: Next Hearing */}
                          <div className="overview-card">
                            <div>
                              <div className="overview-card-header">
                                <span className="overview-card-eyebrow neutral">
                                  <Icon name="clock" size={13} />
                                  Next Hearing
                                </span>
                                {currentMatterDetail.nextHearing.scheduled && (
                                  <span className="overview-status-pill active">Scheduled</span>
                                )}
                              </div>

                              <h3>{currentMatterDetail.nextHearing.date}</h3>
                              <p className="overview-card-body">{currentMatterDetail.nextHearing.detail}</p>
                            </div>

                            <div className="overview-card-footer" style={{ borderTop: 'none', paddingTop: '0' }}>
                              <button
                                className="btn-add-hearing"
                                onClick={() => submitQueryWithMessage(`Add and track upcoming hearing date for ${matter} and prepare preliminary list of dates`)}
                                type="button"
                              >
                                <Icon name="plus" size={14} />
                                <span>{currentMatterDetail.nextHearing.scheduled ? 'Update hearing date' : 'Add hearing date'}</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 4 Metric Cards */}
                        <div className="overview-metrics-grid">
                          <div
                            className="overview-metric-box"
                            onClick={() => openTool(matterTools[1])}
                            title="View documents needing review"
                          >
                            <div className="metric-box-head">
                              <span>DOCUMENTS TO REVIEW</span>
                              <Icon name="arrow" size={12} />
                            </div>
                            <div>
                              <div className="metric-value">{currentMatterDetail.metrics.docsToReview}</div>
                              <div className="metric-subtext">{currentMatterDetail.metrics.docsToReview === 0 ? 'None need review' : `${currentMatterDetail.metrics.docsToReview} pending review`}</div>
                            </div>
                          </div>

                          <div
                            className="overview-metric-box"
                            onClick={() => submitQueryWithMessage(`Show all pending tasks, filing deadlines, and compliances for ${matter}`)}
                            title="View pending tasks"
                          >
                            <div className="metric-box-head">
                              <span>PENDING TASKS</span>
                              <Icon name="arrow" size={12} />
                            </div>
                            <div>
                              <div className="metric-value">{currentMatterDetail.metrics.pendingTasks}</div>
                              <div className="metric-subtext">0 due today</div>
                            </div>
                          </div>

                          <div
                            className="overview-metric-box"
                            onClick={() => openTool(matterTools[2])}
                            title="Explore unresolved facts in Case Mapping"
                          >
                            <div className="metric-box-head">
                              <span>UNRESOLVED FACTS</span>
                              <Icon name="arrow" size={12} />
                            </div>
                            <div>
                              <div className="metric-value">{currentMatterDetail.metrics.unresolvedFacts}</div>
                              <div className="metric-subtext">Across this matter</div>
                            </div>
                          </div>

                          <div
                            className="overview-metric-box"
                            onClick={openPlaybooks}
                            title="View and apply playbooks"
                          >
                            <div className="metric-box-head">
                              <span>PLAYBOOKS</span>
                              <Icon name="arrow" size={12} />
                            </div>
                            <div>
                              <div className="metric-value">{currentMatterDetail.metrics.playbooks}</div>
                              <div className="metric-subtext">Apply to this matter</div>
                            </div>
                          </div>
                        </div>

                        {/* Quick Prompt Suggestion Pills */}
                        <div className="overview-suggestions-row">
                          {[
                            'Tasks for this matter',
                            'What should I prepare for the next hearing?',
                            'Which orders set a deadline we have not met?',
                            'Summarize latest developments',
                            'Draft a maintainability rebuttal memo',
                          ].map((sugg) => (
                            <button
                              className="overview-suggestion-pill"
                              key={sugg}
                              onClick={() => submitQueryWithMessage(sugg)}
                              type="button"
                            >
                              {sugg}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          ) : isNotesWorkspace ? (
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
                  <div className="user-message">{currentChat?.query || submittedQuery}</div>
                  <div className="assistant-message">
                    <div className="assistant-mark"><Icon name="spark" size={17} /></div>
                    <div className="assistant-content">
                      <span className="thinking-label">
                        {currentChat?.thinkingLabel || (matter === 'No matter — general query' ? 'General Legal Research' : 'Reviewing your matter')}
                      </span>
                      <h2>{currentChat?.responseHeading || 'Comprehensive Legal Assessment & Strategy'}</h2>
                      <div className="assistant-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {(currentChat?.responseParagraphs || [
                          `I’m using the documents in ${matter} to prepare a clear answer. I’ll separate confirmed facts from assumptions and flag anything that needs your review.`,
                          `Our analysis indicates that key statutory and contractual instruments must be evaluated against contemporary documentary evidence to establish liability and damages.`,
                          `We recommend formal notice reserving rights while proceeding with necessary interlocutory or dispute escalation steps under the agreed framework.`
                        ]).map((paragraph, idx) => (
                          <p key={idx} className="assistant-para" style={{ margin: 0 }}>{paragraph}</p>
                        ))}
                      </div>
                      {currentChat?.sources && currentChat.sources.length > 0 ? (
                        <div className="source-note">
                          <Icon name="file" size={16} />
                          <span>Referenced sources: {currentChat.sources.join(' · ')}</span>
                        </div>
                      ) : (
                        <div className="source-note"><Icon name="file" size={16} /> 3 relevant matter files found</div>
                      )}
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
                    attachFileToChat(fileName)
                    setDocuments((current) => {
                      if (current.some((d) => d.name === fileName)) return current
                      return [
                        {
                          name: fileName,
                          detail: 'Uploaded in chat',
                          tone: 'blue',
                          matter: matter === 'No matter — general query' ? 'General Legal Workspace' : matter,
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

      {
                      activeFloatingMatter && activeTool !== 'Global library' && activeTool !== 'Playbooks' && (
                        <>
                          {isDraggingDock && (
                            <div className="dock-snap-indicators-layer">
                              <div className={`dock-snap-indicator right ${snapTarget === 'right' ? 'is-active' : ''}`}><span>Right Dock</span></div>
                              <div className={`dock-snap-indicator bottom ${snapTarget === 'bottom' ? 'is-active' : ''}`}><span>Bottom Dock</span></div>
                              <div className={`dock-snap-indicator left ${snapTarget === 'left' ? 'is-active' : ''}`}><span>Left Dock</span></div>
                              <div className={`dock-snap-indicator top ${snapTarget === 'top' ? 'is-active' : ''}`}><span>Top Dock</span></div>
                            </div>
                          )}

                          <aside
                            aria-label="Quick matter tools dock"
                            className={`floating-tools-dock-container pos-${dockPosition} ${dockMinimized ? 'is-minimized' : ''} ${drawerOpen ? 'drawer-is-open' : ''} ${isDraggingDock ? 'is-dragging-free' : ''}`}
                            style={
                              isDraggingDock && dockDragPos
                                ? ({
                                    left: `${dockDragPos.x}px`,
                                    top: `${dockDragPos.y}px`,
                                    right: 'auto',
                                    bottom: 'auto',
                                    transform: 'translate(-50%, -50%)',
                                    '--dock-sidebar-offset': sidebarCollapsed ? '0px' : `${sidebarWidth}px`,
                                  } as React.CSSProperties)
                                : ({
                                    '--dock-sidebar-offset': sidebarCollapsed ? '0px' : `${sidebarWidth}px`,
                                  } as React.CSSProperties)
                            }
                          >
                            <button
                              className="dock-collapse-trigger"
                              onClick={() => setDockMinimized(!dockMinimized)}
                              title={dockMinimized ? 'Expand tools dock' : 'Minimize tools dock'}
                              type="button"
                            >
                              <Icon name={dockMinimized ? 'arrow' : 'close'} size={11} />
                            </button>

                            <div className="floating-tools-island">
                              <div
                                className="dock-drag-grip"
                                onPointerDown={handleDockPointerDown}
                                title="Hold & drag to move dock (Right, Left, Bottom, or Top)"
                              >
                                <Icon name="grip" size={14} />
                              </div>

                              <div className="dock-pos-switcher-wrap">
                                <button
                                  aria-label="Change dock position"
                                  className={`dock-pos-toggle-btn ${positionMenuOpen ? 'active' : ''}`}
                                  onClick={() => setPositionMenuOpen(!positionMenuOpen)}
                                  title={`Current: ${dockPosition.toUpperCase()}. Click to switch side.`}
                                  type="button"
                                >
                                  <Icon name="move" size={13} />
                                </button>
                                {positionMenuOpen && (
                                  <div className="dock-pos-flyout" onClick={(e) => e.stopPropagation()}>
                                    <div className="dock-pos-flyout-title">Dock Position</div>
                                    <div className="dock-pos-grid">
                                      <button className={dockPosition === 'top' ? 'selected' : ''} onClick={() => { setDockPosition('top'); setPositionMenuOpen(false) }}>
                                        <span>↑</span> Top
                                      </button>
                                      <div className="dock-pos-mid-row">
                                        <button className={dockPosition === 'left' ? 'selected' : ''} onClick={() => { setDockPosition('left'); setPositionMenuOpen(false) }}>
                                          <span>←</span> Left
                                        </button>
                                        <button className={dockPosition === 'right' ? 'selected' : ''} onClick={() => { setDockPosition('right'); setPositionMenuOpen(false) }}>
                                          Right <span>→</span>
                                        </button>
                                      </div>
                                      <button className={dockPosition === 'bottom' ? 'selected' : ''} onClick={() => { setDockPosition('bottom'); setPositionMenuOpen(false) }}>
                                        <span>↓</span> Bottom
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="floating-matter-tag" title={activeFloatingMatter}>
                                <span>{floatingMatterInitials}</span>
                              </div>

                              <button
                                className={`floating-dock-btn ${activeTool === 'Overview' ? 'active' : ''}`}
                                data-label="Overview"
                                onClick={() => openMatterOverview(activeFloatingMatter)}
                                title="Matter Overview"
                                type="button"
                              >
                                <Icon name="spark" size={17} />
                              </button>

                              <button
                                className={`floating-dock-btn ${activeTool === 'Documents' ? 'active' : ''}`}
                                data-label="Documents"
                                onClick={() => { setMatter(activeFloatingMatter); openTool(matterTools[1]) }}
                                title={`Documents (${floatingMatterDocumentCount})`}
                                type="button"
                              >
                                <Icon name="folder" size={17} />
                                <span className="floating-badge">{floatingMatterDocumentCount}</span>
                              </button>

                              <button
                                className={`floating-dock-btn ${activeTool === 'Case mapping' ? 'active' : ''}`}
                                data-label="Case mapping"
                                onClick={() => { setMatter(activeFloatingMatter); openTool(matterTools[2]) }}
                                title="Case mapping"
                                type="button"
                              >
                                <Icon name="map" size={17} />
                              </button>

                              <button
                                className={`floating-dock-btn ${activeTool === 'Chronology' ? 'active' : ''}`}
                                data-label="Chronology"
                                onClick={() => { setMatter(activeFloatingMatter); openTool(matterTools[3]) }}
                                title="Chronology"
                                type="button"
                              >
                                <Icon name="clock" size={17} />
                              </button>

                              <button
                                className={`floating-dock-btn ${activeTool === 'Tabular review' ? 'active' : ''}`}
                                data-label="Tabular review"
                                onClick={() => { setMatter(activeFloatingMatter); openTool(matterTools[4]) }}
                                title="Tabular review"
                                type="button"
                              >
                                <Icon name="table" size={17} />
                              </button>

                              <button
                                className={`floating-dock-btn ${activeTool === 'Notes' ? 'active' : ''}`}
                                data-label="Notes"
                                onClick={() => { setMatter(activeFloatingMatter); openTool(matterTools[6]) }}
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
                        </>
                      )
                    }

                    { drawerOpen && <button aria-label="Close files" className="drawer-scrim" onClick={() => setDrawerOpen(false)} /> }
                    {(() => {
                      const activeFileScope = fileScope === 'matter' ? 'matrix' : fileScope === 'global' ? 'all' : fileScope
                      return (
                    <aside aria-hidden={!drawerOpen} className={`file-drawer ${drawerOpen ? 'is-open' : ''}`}>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                      />
                      <div className="drawer-header">
                        <div>
                          <p className="eyebrow">
                            {activeFileScope === 'in-chat'
                              ? (activeChat ? 'Conversation Files' : 'New Conversation')
                              : activeFileScope === 'all'
                              ? 'Portfolio Library'
                              : selectedMatrixMatter
                              ? `Matrix · ${selectedMatrixMatter}`
                              : 'Matter Matrices'}
                          </p>
                          <h2>
                            {activeFileScope === 'in-chat'
                              ? 'In this chat'
                              : activeFileScope === 'all'
                              ? 'All files'
                              : selectedMatrixMatter
                              ? selectedMatrixMatter
                              : 'Folder Matrix'}
                          </h2>
                        </div>
                        <button aria-label="Close files" className="icon-button" onClick={() => setDrawerOpen(false)} type="button">
                          <Icon name="close" size={16} />
                        </button>
                      </div>

                      <div className="library-scope-tabs">
                        <button
                          className={activeFileScope === 'in-chat' ? 'active' : ''}
                          onClick={() => { setFileScope('in-chat'); setSelectedMatrixMatter(null) }}
                          type="button"
                        >
                          In this chat ({currentChatFiles.length})
                        </button>
                        <button
                          className={activeFileScope === 'all' ? 'active' : ''}
                          onClick={() => { setFileScope('all'); setSelectedMatrixMatter(null) }}
                          type="button"
                        >
                          All files ({documents.length})
                        </button>
                        <button
                          className={activeFileScope === 'matrix' ? 'active' : ''}
                          onClick={() => setFileScope('matrix')}
                          type="button"
                        >
                          By Matrix ({availableMatterFolders.length})
                        </button>
                      </div>

                      {/* TAB 1: IN THIS CHAT */}
                      {activeFileScope === 'in-chat' && (
                        <>
                          {currentChatFiles.length === 0 ? (
                            <div className="drawer-empty-chat-files">
                              <div className="empty-chat-files-badge">
                                <Icon name="folder" size={24} />
                              </div>
                              <h3>0 files in this chat</h3>
                              <p>Upload a document, attach from Matrix, or create legal drafts in this chat to see them here.</p>
                              <div className="empty-chat-files-actions">
                                <button className="btn-drawer-upload-primary" onClick={triggerQuickUploadPrompt} type="button">
                                  <Icon name="plus" size={15} />
                                  <span>Upload file</span>
                                </button>
                                <button className="btn-drawer-switch-matrix" onClick={() => setFileScope('matrix')} type="button">
                                  <Icon name="table" size={14} />
                                  <span>Browse Matrix</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="drawer-toolbar">
                                <label>
                                  <Icon name="search" size={16} />
                                  <input
                                    placeholder="Search chat files"
                                    value={drawerSearch}
                                    onChange={(e) => setDrawerSearch(e.target.value)}
                                  />
                                  {drawerSearch && (
                                    <button
                                      aria-label="Clear search"
                                      onClick={() => setDrawerSearch('')}
                                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                      type="button"
                                    >
                                      <Icon name="close" size={13} />
                                    </button>
                                  )}
                                </label>
                                <button className="btn-upload-file" onClick={triggerQuickUploadPrompt} type="button">
                                  <Icon name="plus" size={15} /> Upload
                                </button>
                              </div>

                              <div className="file-list-scroll">
                                {documents
                                  .filter((doc) => currentChatFiles.includes(doc.name))
                                  .filter((doc) => doc.name.toLowerCase().includes(drawerSearch.toLowerCase()))
                                  .map((document) => (
                                    <div
                                      className="file-drawer-card"
                                      draggable
                                      key={document.name}
                                      onDragEnd={() => setIsComposerDragActive(false)}
                                      onDragStart={(event) => {
                                        event.dataTransfer.effectAllowed = 'copy'
                                        event.dataTransfer.setData('text/plain', `Review document "${document.name}"`)
                                        event.dataTransfer.setData('application/x-lawvriksh-document', document.name)
                                        window.setTimeout(() => {
                                          setDrawerOpen(false)
                                          setIsComposerDragActive(true)
                                        }, 80)
                                      }}
                                      title="Drag this document into the AI composer"
                                    >
                                      <span className={`file-icon ${document.tone}`}><Icon name="file" size={17} /></span>
                                      <div className="file-drawer-info">
                                        <span className="file-drawer-title">{document.name}</span>
                                        <div className="file-drawer-meta">
                                          <span>{document.size || '1.4 MB'}</span>
                                          <span className="file-drawer-meta-badge">In this chat</span>
                                        </div>
                                      </div>
                                      <div className="file-drawer-actions">
                                        <button
                                          className="btn-file-attach-chip is-attached"
                                          onClick={() => {
                                            setAttachedFile(document.name)
                                            setDrawerOpen(false)
                                          }}
                                          title="Set as active prompt context"
                                          type="button"
                                        >
                                          {attachedFile === document.name ? 'Active' : 'Attach'}
                                        </button>
                                        <button
                                          aria-label={`Remove ${document.name} from chat`}
                                          className="btn-file-remove-chip"
                                          onClick={() => removeFileFromChat(document.name)}
                                          title="Remove from chat"
                                          type="button"
                                        >
                                          <Icon name="close" size={13} />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </>
                          )}
                        </>
                      )}

                      {/* TAB 2: ALL FILES */}
                      {activeFileScope === 'all' && (
                        <>
                          <div className="drawer-toolbar">
                            <label>
                              <Icon name="search" size={16} />
                              <input
                                placeholder="Search all portfolio files"
                                value={drawerSearch}
                                onChange={(e) => setDrawerSearch(e.target.value)}
                              />
                              {drawerSearch && (
                                <button
                                  aria-label="Clear search"
                                  onClick={() => setDrawerSearch('')}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                  type="button"
                                >
                                  <Icon name="close" size={13} />
                                </button>
                              )}
                            </label>
                            <button className="btn-upload-file" onClick={triggerQuickUploadPrompt} type="button">
                              <Icon name="plus" size={15} /> Upload
                            </button>
                          </div>

                          <div
                            className="file-list-scroll"
                            onScroll={(e) => {
                              const target = e.currentTarget
                              if (target.scrollTop + target.clientHeight >= target.scrollHeight - 40) {
                                setAllFilesLimit((curr) => curr + 12)
                              }
                            }}
                          >
                            {(() => {
                              const filtered = documents.filter((doc) =>
                                doc.name.toLowerCase().includes(drawerSearch.toLowerCase()) ||
                                doc.matter.toLowerCase().includes(drawerSearch.toLowerCase())
                              )
                              const visible = filtered.slice(0, allFilesLimit)
                              return (
                                <>
                                  {visible.map((document) => {
                                    const isAttached = currentChatFiles.includes(document.name)
                                    return (
                                      <div
                                        className="file-drawer-card"
                                        draggable
                                        key={document.name}
                                        onDragEnd={() => setIsComposerDragActive(false)}
                                        onDragStart={(event) => {
                                          event.dataTransfer.effectAllowed = 'copy'
                                          event.dataTransfer.setData('text/plain', `Review document "${document.name}"`)
                                          event.dataTransfer.setData('application/x-lawvriksh-document', document.name)
                                          window.setTimeout(() => {
                                            setDrawerOpen(false)
                                            setIsComposerDragActive(true)
                                          }, 80)
                                        }}
                                        title="Drag this document into the AI composer"
                                      >
                                        <span className={`file-icon ${document.tone}`}><Icon name="file" size={17} /></span>
                                        <div className="file-drawer-info">
                                          <span className="file-drawer-title">{document.name}</span>
                                          <div className="file-drawer-meta">
                                            <span>{document.size || '1.8 MB'}</span>
                                            <span className="file-drawer-meta-badge">{document.matter}</span>
                                          </div>
                                        </div>
                                        <div className="file-drawer-actions">
                                          <button
                                            className={`btn-file-attach-chip ${isAttached ? 'is-attached' : ''}`}
                                            onClick={() => {
                                              if (isAttached) {
                                                removeFileFromChat(document.name)
                                              } else {
                                                attachFileToChat(document.name)
                                              }
                                            }}
                                            title={isAttached ? 'Click to detach from chat' : 'Attach to current conversation'}
                                            type="button"
                                          >
                                            {isAttached ? '✓ In chat' : '+ Attach'}
                                          </button>
                                        </div>
                                      </div>
                                    )
                                  })}
                                  {allFilesLimit < filtered.length && (
                                    <button
                                      className="btn-drawer-load-more"
                                      onClick={() => setAllFilesLimit((c) => c + 15)}
                                      type="button"
                                    >
                                      Load more ({filtered.length - allFilesLimit} remaining)
                                    </button>
                                  )}
                                </>
                              )
                            })()}
                          </div>
                        </>
                      )}

                      {/* TAB 3: MATRIX / FOLDERS */}
                      {activeFileScope === 'matrix' && (
                        <>
                          {selectedMatrixMatter === null ? (
                            <>
                              <div className="drawer-toolbar">
                                <label>
                                  <Icon name="search" size={16} />
                                  <input
                                    placeholder="Search matter matrices"
                                    value={drawerSearch}
                                    onChange={(e) => setDrawerSearch(e.target.value)}
                                  />
                                  {drawerSearch && (
                                    <button
                                      aria-label="Clear search"
                                      onClick={() => setDrawerSearch('')}
                                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                      type="button"
                                    >
                                      <Icon name="close" size={13} />
                                    </button>
                                  )}
                                </label>
                              </div>

                              <div className="matrix-cards-list">
                                {availableMatterFolders
                                  .filter((item) => item.toLowerCase().includes(drawerSearch.toLowerCase()))
                                  .map((item) => {
                                    const count = documents.filter((d) => d.matter === item).length
                                    return (
                                      <div
                                        className="matrix-card"
                                        key={item}
                                        onClick={() => {
                                          setSelectedMatrixMatter(item)
                                          setDrawerSearch('')
                                        }}
                                      >
                                        <div className="matrix-card-icon">
                                          <Icon name={matterIcons[item] || 'folder'} size={16} />
                                        </div>
                                        <div className="matrix-card-body">
                                          <span className="matrix-card-title">{item}</span>
                                          <span className="matrix-card-subtitle">Connected files matrix</span>
                                        </div>
                                        <span className="matrix-card-count">{count} files</span>
                                        <Icon name="chevron" size={14} />
                                      </div>
                                    )
                                  })}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="matrix-breadcrumb-bar">
                                <button
                                  className="btn-matrix-back"
                                  onClick={() => setSelectedMatrixMatter(null)}
                                  type="button"
                                >
                                  <Icon name="arrow" size={13} />
                                  <span>All Matrices</span>
                                </button>
                                <span className="matrix-breadcrumb-sep">/</span>
                                <span className="matrix-breadcrumb-title">{selectedMatrixMatter}</span>
                              </div>

                              <div className="drawer-toolbar">
                                <label>
                                  <Icon name="search" size={16} />
                                  <input
                                    placeholder={`Search in ${selectedMatrixMatter}`}
                                    value={drawerSearch}
                                    onChange={(e) => setDrawerSearch(e.target.value)}
                                  />
                                </label>
                                <button className="btn-upload-file" onClick={triggerQuickUploadPrompt} type="button">
                                  <Icon name="plus" size={15} /> Upload
                                </button>
                              </div>

                              <div className="file-list-scroll">
                                {documents
                                  .filter((doc) => doc.matter === selectedMatrixMatter)
                                  .filter((doc) => doc.name.toLowerCase().includes(drawerSearch.toLowerCase()))
                                  .map((document) => {
                                    const isAttached = currentChatFiles.includes(document.name)
                                    return (
                                      <div
                                        className="file-drawer-card"
                                        draggable
                                        key={document.name}
                                        onDragEnd={() => setIsComposerDragActive(false)}
                                        onDragStart={(event) => {
                                          event.dataTransfer.effectAllowed = 'copy'
                                          event.dataTransfer.setData('text/plain', `Review document "${document.name}"`)
                                          event.dataTransfer.setData('application/x-lawvriksh-document', document.name)
                                          window.setTimeout(() => {
                                            setDrawerOpen(false)
                                            setIsComposerDragActive(true)
                                          }, 80)
                                        }}
                                        title="Drag this document into the AI composer"
                                      >
                                        <span className={`file-icon ${document.tone}`}><Icon name="file" size={17} /></span>
                                        <div className="file-drawer-info">
                                          <span className="file-drawer-title">{document.name}</span>
                                          <div className="file-drawer-meta">
                                            <span>{document.size || '1.6 MB'}</span>
                                            <span className="file-drawer-meta-badge">{document.detail}</span>
                                          </div>
                                        </div>
                                        <div className="file-drawer-actions">
                                          <button
                                            className={`btn-file-attach-chip ${isAttached ? 'is-attached' : ''}`}
                                            onClick={() => {
                                              if (isAttached) {
                                                removeFileFromChat(document.name)
                                              } else {
                                                attachFileToChat(document.name)
                                              }
                                            }}
                                            title={isAttached ? 'In current conversation' : 'Attach to current conversation'}
                                            type="button"
                                          >
                                            {isAttached ? '✓ In chat' : '+ Attach'}
                                          </button>
                                        </div>
                                      </div>
                                    )
                                  })}
                              </div>
                            </>
                          )}
                        </>
                      )}

                      <div className="drawer-tip">
                        <Icon name="spark" size={16} />
                        <p><strong>Drag & Drop</strong><span>Drag any document directly into the legal composer to ground answers.</span></p>
                      </div>
                    </aside>
                      )
                    })()}
                    {
                      showTour && (
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
                      )
                    }
    </div>
              )
}
