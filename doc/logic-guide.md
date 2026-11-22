# LawVriksh Frontend Architecture & Logic Implementation Guide

> **Target Version**: LawVriksh UI V4 (Core Production Home Workspace)  
> **Source Component**: [`src/app/(frontend)/LawVrikshAppV4.tsx`](file:///Users/deepakkumar/Downloads/Simplify%20Lawvriksh%20Website/src/app/(frontend)/LawVrikshAppV4.tsx)  
> **Primary Stylesheet**: [`src/app/(frontend)/styles.css`](file:///Users/deepakkumar/Downloads/Simplify%20Lawvriksh%20Website/src/app/(frontend)/styles.css)  
> **Purpose**: Complete blueprint, state contracts, interaction algorithms, and CSS mechanics required to replicate, refactor, or build a new modern legal AI workspace from scratch.

---

## Table of Contents
1. [High-Level Architectural Overview](#1-high-level-architectural-overview)
2. [State Machine & Data Contracts](#2-state-machine--data-contracts)
3. [Top Application Header](#3-top-application-header)
4. [Leftmost Global Utility Rail](#4-leftmost-global-utility-rail)
5. [Collapsible & Split-Resizable Sidebar](#5-collapsible--split-resizable-sidebar)
6. [Central Legal Chat & Composer Workspace](#6-central-legal-chat--composer-workspace)
7. [Context-Aware 3-Scope File Drawer](#7-context-aware-3-scope-file-drawer)
8. [Movable & 4-Edge Snappable Floating Tools Dock](#8-movable--4-edge-snappable-floating-tools-dock)
9. [CSS Design Tokens, Stacking (Z-Index), & Edge Cases](#9-css-design-tokens-stacking-z-index--edge-cases)

---

## 1. High-Level Architectural Overview

The application is structured into four reactive layout layers:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [LawVriksh]  [⌘B]   [📁 Feature comparison v]                      [Files 0]  [Profile]│ HEADER
├───────┬──────────────────────┬─────────────────────────────────────────────────┬───────┤
│ RAIL  │ SIDEBAR (Resizable)  │ MAIN CHAT WORKSPACE (Gutter-aware)              │ DOCK  │
│       │                      │                                                 │       │
│ [🏠]  │ [+ New conversation] │ Welcome Screen / Active Conversation            │ [:::] │
│       │                      │ - Thinking Label & Headings                     │ [⤹⤸]  │
│ [📁]  │ ▼ MATTERS            │ - Precedent & Fact Analysis                     │ [ZP]  │
│       │   📁 Asterix... [⋮][+]│                                                 │ [✨]  │
│ [📚]  │      💬 Reconcile... │                                                 │ [📁]  │
│       │ ═════ Splitter ═════ │                                                 │ [🗺️]  │
│ [📖]  │ ▼ RECENT             │ ┌─────────────────────────────────────────────┐ │ [⏱️]  │
│       │   💬 Non-compete...  │ │ AI Composer (Drag & Drop Target)      [  ➤] │ │ [📊]  │
│ [📝]  │                      │ └─────────────────────────────────────────────┘ │ [⋮]   │
└───────┴──────────────────────┴─────────────────────────────────────────────────┴───────┘
```

---

## 2. State Machine & Data Contracts

### A. Core TypeScript Models

```typescript
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
  files?: string[] // Documents attached specifically to this chat
}

export type AppDocument = {
  name: string
  matter: string
  category: 'case-record' | 'chat-attachment'
  tone: 'neutral' | 'accent' | 'warm'
  detail: string
  size?: string
}
```

### B. State Registry

| State Variable | Type | Default | Description |
|---|---|---|---|
| `matter` | `string` | `'Asterix Precision Castings'` | Currently active workspace matter context (`'No matter — general query'` for standalone chat). |
| `activeChat` | `string` | `''` | ID of the active conversation (`''` represents home / new chat). |
| `submittedQuery` | `string` | `''` | Current grounded question. Empty triggers the Welcome Hero view. |
| `newChatFiles` | `string[]` | `[]` | Files staged during an unsaved new chat (`!activeChat`). |
| `dockMatter` | `string \| null` | `null` | Matter explicitly targeted by the floating tools dock. |
| `dockPosition` | `'right' \| 'bottom' \| 'left' \| 'top'` | `'right'` | Active edge attachment of the movable tools dock. |
| `dockMinimized` | `boolean` | `false` | Whether the floating dock is collapsed into its edge trigger. |
| `fileScope` | `'in-chat' \| 'all' \| 'matrix'` | `'in-chat'` | Active view tab inside the right-hand file drawer. |
| `drawerOpen` | `boolean` | `false` | Sliding state of the right-hand file drawer. |
| `mattersSplitPercent`| `number \| null` | `null` | Vertical height percentage allocated to the Matters sidebar list. |
| `sidebarCollapsed` | `boolean` | `false` | Desktop width toggle for the left navigation sidebar. |

---

## 3. Top Application Header

### A. Dynamic Chat Title Pill (ChatGPT Reference Pattern)
The top header title is context-sensitive and acts as an interactive menu:

1. **New Conversation State (`!activeChat`)**:
   - Header title area renders `null` (completely blank), keeping the interface distraction-free.
2. **Matter-Linked Chat State (`currentChat.matter !== 'No matter — general query'`)**:
   - Renders: `[📁 Matter-Folder-Icon] [Chat Title Text] [⌄ Chevron]`
   - Matter icon uses warm terracotta `#a64927`.
   - Title text has `max-width: 340px`, smoothly truncating with `text-overflow: ellipsis`.
3. **General / Non-Matter Chat State**:
   - Renders: `[Chat Title Text] [⌄ Chevron]` without the folder icon.

### B. Floating Actions Dropdown Menu
Clicking the title pill toggles `.header-chat-dropdown` (248px width, 14px radius, backdrop blur):
- **✏️ Rename** (`⌥⌘R`): Prompts new title; updates conversation title and promotes in recents.
- **📌 Pin / Unpin chat** (`⌥⌘P`): Toggles priority sorting flag `chat.pinned`.
- **🔒 Lock chat**: Locks conversation permissions into read-only mode.
- *Divider*
- **🌐 Open on lawvriksh.com**: Generates and copies shareable link to clipboard.
- *Divider*
- **🗄️ Archive** (`⇧⌘A`): Soft-deletes the conversation from active view.
- **🗑️ Delete** (`#dc2626` Danger): Removes conversation permanently.
- *Divider*
- **📁 Move to project >**: Moves chat to any existing matter.
- **✕ Remove from project**: Only shown for matter chats; resets chat to general non-matter.

### C. Dynamic "Files" Header Badge
- **New Chat / Zero Files**: Renders **`Files 0`** (`.files-button b.is-zero`) in muted `#8c8273` styling.
- **Attached Files Present**: Renders **`Files N`** (`.files-button b.has-files`) in bold `#ffffff` on `#a64927` terracotta badge.
- **Computation Formula**:
  ```typescript
  const currentChatFiles: string[] = useMemo(() => {
    if (!activeChat) return newChatFiles
    return currentChat?.files || []
  }, [activeChat, currentChat, newChatFiles])
  ```

---

## 4. Leftmost Global Utility Rail

A 56px dark/neutral vertical rail (`.utility-rail`) providing 1-click mode switching:
- **`[🏠]` Chat Home**: Resets active tools and returns to the AI conversational interface.
- **`[📁]` All Matters**: Switches to portfolio directory overview of all legal disputes and proceedings.
- **`[📚]` Global Library**: Opens repository search across all evidentiary records.
- **`[📖]` Playbooks**: Standardizes strategic clauses and arguments.
- **`[📝]` Saved Notes**: Personal attorney scratchpads and research briefs.
- **Bottom Profile**: User initials badge with firm workspace settings.

---

## 5. Collapsible & Split-Resizable Sidebar

### A. Matters Section Interaction Contract

#### 1. Single-Click Behavior (`onClick`)
- **Matter Open/Expand**:
  - `setDockMatter(item)`: Instantly reveals the floating tools dock on the right.
  - `setDockMinimized(false)`: Ensures tools are un-collapsed.
  - **Zero Auto-Chat Disruption**: Does **NOT** switch or auto-open any conversation. The user's active screen remains 100% intact.
  - Toggles the matter sub-chats accordion (`setExpandedMatter`) after a 240ms debounce window.
- **Matter Close/Collapse**:
  - If the user was in a non-matter general query chat (`matter === 'No matter — general query'`), collapsing the matter folder **automatically hides the floating dock** (`setDockMatter(null)`).
  - If the user is actively working inside that matter (`matter === item`), the dock stays open, maintaining workflow continuity.

#### 2. Double-Click Behavior (`onDoubleClick`)
- Bypasses chat and opens the **Matter Overview Hub** dashboard (`openMatterOverview(item, 'chats')`).

#### 3. Sub-Chat 10-Item Cap & "View all"
- Renders a maximum of the **top 10 most recent sub-chats** (pinned items first, then by `updatedAt`).
- When a matter contains >10 chats, renders a sleek button:  
  `View all (N) chats →`  
  Clicking immediately opens the Matter Overview Hub showing the full searchable ledger.

### B. Title Marquee Scroll on Hover (ChatGPT Pattern)
- Replaces ugly `...` with `text-overflow: clip`.
- When row title overflows container (`.is-overflowing`), hovering triggers horizontal keyframe marquee:
  ```css
  @keyframes title-hover-scroll-matter {
    0%, 18% { transform: translateX(0%); }
    82%, 100% { transform: translateX(min(0px, calc(110px - 100%))); }
  }
  ```
- Backed by an absolute gradient overlay on action buttons to preserve icon contrast.

### C. Recents Ordering & Stability Contract
- **Reading / Selecting a Chat**: Clicking a chat in Recents **never** alters its position in the list.
- **Promotion to Top (#1)**: A chat is promoted to the top of Recents **only upon mutation**:
  1. Sending a new message (`submitQuery`).
  2. Renaming the chat (`renameChat`).
  3. Reassigning to a matter (`moveChat`).

### D. Dynamic Resizer Splitter Bar
- Located between Matters and Recent sections (`.sidebar-section-divider`).
- Draggable splitter clamped strictly between **28% (minimum 3 matters)** and **65% (maximum 6 recents)**.
- Independent custom webkit scrollbars (4px width) for both lists.

---

## 6. Central Legal Chat & Composer Workspace

### A. Welcome Screen vs. Active Conversation
- **`!submittedQuery`**: Renders legal onboarding hero, headline *"What can I help you work through?"*, and strategic legal suggestion cards.
- **`submittedQuery`**: Renders conversation thread with thinking label, strategic headings, structured analysis paragraphs, and cited source tags.

### B. AI Legal Composer
- Multi-line textarea with auto-resizing and keyboard listeners (`Enter` submits, `Shift+Enter` inserts line break).
- **Context Pill**: Shows green dot and switches between `General` and `Matter files`. Clicking opens the file drawer directly.
- **Native File Drag & Drop Target**:
  - Dragging any document from the File Drawer or Desktop over the composer triggers `.is-dragging` with terracotta border highlight.
  - Dropping automatically calls `attachFileToChat(fileName)` and grounds the prompt in that document.

---

## 7. Context-Aware 3-Scope File Drawer

Slides in from the right (`width: min(430px, 92vw)`). Elevated with:
```css
.drawer-scrim { z-index: 140 !important; }
.file-drawer  { z-index: 150 !important; }
```

### A. Tab 1: In this chat (`in-chat`)
- Displays documents specifically attached to the active conversation.
- **Empty State**: Minimal dashed container explaining that 0 files are attached, with quick actions:
  - `+ Upload file`: Opens native OS file picker.
  - `📂 Browse Matrix`: Jumps to Tab 3 folder matrices.
- Attached cards feature a `✕ Remove` button to detach files dynamically.

### B. Tab 2: All files (`all`)
- Displays all portfolio documents across all matters.
- Screen performance safeguard: Initial view capped at 12 items with a smooth `Load more documents` button.
- Real-time text search filtering by document name or matter.
- Quick toggle chips: `+ Attach` / `✓ In chat`.

### C. Tab 3: By Matrix (`matrix`)
- Grid cards representing each matter's document repository with folder icon, title, and count badge.
- Clicking any matrix navigates into its internal file list with breadcrumb (`← All matrices`).
- Every document card is draggable directly into the AI composer.

---

## 8. Movable & 4-Edge Snappable Floating Tools Dock

A relocatable quick-tools dock (`.floating-tools-dock-container`) for instant access to legal intelligence tools.

```
       [Top Dock: Horizontal Pill]
  ┌────────────────────────────────────┐
  │                                    │
[Left]           WORKSPACE           [Right]
(Vertical)                           (Vertical - Default)
  │                                    │
  └────────────────────────────────────┘
     [Bottom Dock: Horizontal Pill]
```

### A. 4 Edge Placement Specifications

| Position | Orientation | CSS Positioning | Flyout Direction | Collapse Trigger |
|---|---|---|---|---|
| **Right** (Default) | Vertical Column | `right: 18px; top: 50%; transform: translateY(-50%)` | Left (`right: 56px`) | Left (`left: -11px`) |
| **Left** | Vertical Column | `left: calc(var(--offset) + 16px); top: 50%; translateY(-50%)` | Right (`left: 56px`) | Right (`right: -11px`) |
| **Bottom** | Horizontal Pill | `bottom: 18px; left: 50%; transform: translateX(-50%)` | Upward (`bottom: 58px`) | Top (`top: -11px`) |
| **Top** | Horizontal Pill | `top: 76px; left: 50%; transform: translateX(-50%)` | Downward (`top: 58px`) | Bottom (`bottom: -11px`) |

### B. Dual Relocation Mechanics

1. **Physical Drag & Edge Snapping**:
   - Holding the **6-Dot Drag Grip Handle** (`.dock-drag-grip`) initiates direct cursor tracking.
   - Screen boundaries activate snap zones (`.dock-snap-indicator.is-active`).
   - Releasing the pointer snaps the dock to the nearest edge (`Right`, `Left`, `Bottom`, or `Top`).
2. **1-Click Directional Switcher**:
   - The Move icon button (`.dock-pos-toggle-btn`) opens a directional pad flyout with 4 buttons: `↑ Top`, `← Left`, `→ Right`, `↓ Bottom`.
   - Clicking immediately relocates the dock with a 260ms cubic-bezier transition.

### C. Gutter & Drawer Stacking Contract
- Workspace padding automatically respects the dock position:
  - `.has-dock-gutter-right` -> `padding-right: 76px`
  - `.has-dock-gutter-left` -> `padding-left: 76px`
  - `.has-dock-gutter-bottom` -> `padding-bottom: 76px`
  - `.has-dock-gutter-top` -> `padding-top: 56px`
- When the File Drawer opens (`drawerOpen === true`), `.drawer-is-open` subordinates the dock:
  ```css
  .floating-tools-dock-container.drawer-is-open {
    z-index: 30 !important;
    opacity: 0.12 !important;
    pointer-events: none !important;
    filter: blur(1px);
  }
  ```

---

## 9. CSS Design Tokens, Stacking (Z-Index), & Edge Cases

### A. Strict Stacking Hierarchy (Z-Index)

```
1000  Free Dragging Dock (.is-dragging-free)
 998  Edge Snap Indicators Layer (.dock-snap-indicators-layer)
 200  Onboarding Tour Modal Overlay (.tour-overlay)
 150  Right-Hand File Drawer (.file-drawer)
 140  File Drawer Backdrop Scrim (.drawer-scrim)
 120  Dock Position Switcher Flyout (.dock-pos-flyout)
 100  Dock Tools Flyout (.floating-dock-flyout)
  99  Resting Floating Tools Dock (.floating-tools-dock-container)
  50  Header Floating Context Menu (.header-chat-dropdown)
  45  Global Utility Rail & App Header (.utility-rail, .app-header)
  40  Left Navigation Sidebar (.sidebar)
  30  Subordinated Dock while Drawer Open (.drawer-is-open)
```

### B. Palette Tokens
- **Background Root**: `#fbf8f2` (Warm Ivory)
- **Cards & Panes**: `#ffffff` / `#fffefa`
- **Primary Borders**: `#e4dfd5` / `#ddd7cd`
- **Text Headings**: `#1a1917` (Deep Charcoal Serif / DM Serif Display)
- **Text Body**: `#38332b` / `#4a4439` (System UI / DM Sans)
- **Brand Terracotta Accent**: `#a64927` (Used for active matter icons, badges, primary buttons)
- **Subtle Badges**: `#f0ece2` (Muted Neutral)
