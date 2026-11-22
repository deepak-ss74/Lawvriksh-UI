# Sidebar & Chat Navigation Architecture Documentation (LawVriksh V4)

A compact technical overview of the structure, interaction logic, and styling mechanics implemented for the **Matters** and **Recent Chats** sidebar in Version 4.

---

## 1. High-Level Architecture & Layout

The sidebar acts as the primary workspace navigation hub, structured into three main vertical zones:

```
┌────────────────────────────────────────────────────────┐
│  [+ New conversation]                        [ ⌘N ]    │
├────────────────────────────────────────────────────────┤
│  ▼ MATTERS (Accordion)                       [ Q ] [+] │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 📁 Asterix Precision Castings        [ ⋮ ] [ + ] │  │
│  │    ├─ 💬 Reconcile purchase orders...      [ ⋮ ] │  │
│  │    └─ 💬 Draft settlement term sheet...    [ ⋮ ] │  │
│  │ 🏢 Aarohan GridTech Solutions        [ ⋮ ] [ + ] │  │
│  └──────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────┤
│  ═══ Dynamic Drag Resizer Handle (28% - 65% lock) ═══  │
├────────────────────────────────────────────────────────┤
│  ▼ RECENT (Accordion)                        [ Q ]     │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 💬 Enforceability of non-compete...        [ ⋮ ] │  │
│  │    No matter · Just now                          │  │
│  │ 💬 Limitation period & statutory...        [ ⋮ ] │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 2. Dynamic Split & Resizing Logic

- **State Management**:
  - `mattersSplitPercent`: Controls the flex-basis percentage of the Matters list (default ~48%).
  - `isVerticalResizing`: Tracks active mouse drag state.
  - `mattersSectionOpen` / `recentSectionOpen`: Collapsible accordion states.
- **Boundary Clamping**:
  - Upper boundary: **65%** (prevents Matters from pushing Recent chats completely off-screen).
  - Lower boundary: **28%** (ensures at least 2–3 Matters remain visible).
  - Empty state handling: If zero matters exist, the container auto-collapses to allow Recent conversations maximum visibility.
- **Independent Scrolling**:
  - Overall sidebar has `overflow-x: hidden`.
  - Both `.project-list` and `.chat-list` possess independent `overflow-y: auto` with sleek custom webkit scrollbars (4px, `#cfc8be`).

---

## 3. Matters Interaction Workflow

### A. Single-Click vs. Double-Click Contract
- **Single Click (`onClick`)**:
  - Sets the matter as active (`selectedFolder`).
  - Toggles the expanded sub-chat accordion for that matter.
  - Filters active workspace views without leaving the chat interface.
- **Double Click (`onDoubleClick`)**:
  - Triggers direct deep-linking to the **Matter Overview Hub** (`currentView = 'matter-hub'`).
  - Opens the full case overview dashboard (Case mapping, Chronology, Documents, Milestones).

### B. Action Icons Behavior
- **Main Matter Row**:
  - Contains both **Three-Dot Menu (`⋮`)** and **New Chat (`+`)** icon.
  - Active Matter State: `+` icon remains visible with `#a64927` accent; `⋮` icon reveals on hover.
  - Hover State: Both icons fade in (`opacity: 0.85`), supported by a linear gradient fade backdrop.
- **Matter Sub-Chat Row**:
  - Contains **strictly the Three-Dot Menu (`⋮`)**. The Plus icon is excluded here to avoid clutter.
  - Expands naturally with `max-height: none` to eliminate any top-item clipping.

### C. Recents Ordering & Stability Contract (View vs. Mutation)
- **Clicking / Opening a Chat (`selectChat`)**:
  - Strictly switches the active conversation view and context.
  - Does **not** mutate `updatedAt` or timestamp.
  - **No unexpected jumping**: Opening a chat to read it leaves its position in the Recents list completely unchanged.
- **Top-of-List Promotion Triggers**:
  - A chat is promoted to the top (#1 position) in Recents **only** when mutated by user action:
    1. A new message is sent in the conversation (`submitQuery`).
    2. The conversation is edited or renamed (`renameChat`).
    3. The conversation is reassigned or moved (`moveChat`).

### D. Matter Chats 10-Item Cap & "View all" Hub Link
- **Sidebar Display Cap**:
  - A maximum of the **top 10 most recent conversations** are rendered directly inside an expanded matter.
  - Pinned chats are given top priority, followed by recency (`updatedAt`).
  - Prevents tall, unwieldy sidebar scrolling when a matter has 15, 20+ chats.
- **"View all (N) chats" Link**:
  - When a matter has more than 10 chats (`matterChats.length > 10`), a sleek minimal `.matter-chat-view-all-btn` appears at the bottom of the sub-chat list.
  - Clicking this button immediately opens the **Matter Overview Hub** (`openMatterOverview(item, 'chats')`), presenting all conversations with full history and search.

---

## 4. Title Presentation & Marquee Scroll (ChatGPT Style)

To maintain a clean aesthetic matching modern AI assistants without truncated dots or jarring tooltips:

### A. Ellipsis Elimination (`text-overflow: clip`)
- Replaced `text-overflow: ellipsis` with `text-overflow: clip` across all item titles.
- In resting state, text takes the full width and clips cleanly at the right edge without trailing `...`.

### B. Marquee Slide on Hover
- Titles are wrapped in `.title-scroll-container` (`overflow: hidden; position: relative`).
- If text exceeds standard row length (`is-overflowing` flag), hovering initiates a smooth horizontal CSS marquee:
  ```css
  @keyframes title-hover-scroll-matter {
    0%, 18% { transform: translateX(0%); }
    82%, 100% { transform: translateX(min(0px, calc(110px - 100%))); }
  }
  ```
- **Math Mechanics**: `min(0px, calc(W - 100%))` ensures the translation strictly moves left (never shifts right for short text) and pauses 0.9s at both start and finish.

### C. Gradient Backdrop Overlay
- Positioned absolutely at `right: 2px` on each row:
  ```css
  background: linear-gradient(90deg, rgba(228, 223, 213, 0) 0%, rgba(228, 223, 213, 0.95) 24%, #e4dfd5 100%);
  ```
- Allows long scrolling text to seamlessly slide underneath action buttons while preserving icon readability and clickability.
- Native browser `title="..."` attributes were removed to prevent grey tooltip boxes from obscuring the animation.

---

## 5. Header Chat Title & Floating Options Dropdown (ChatGPT Native Reference)

- **New Conversation State**:
  - When the user starts or clicks **"New conversation"** (`!activeChat`), the header title area is **completely blank/empty** (`null`). Nothing is rendered.
- **Matter-Attached Chat State** *(Reference Image 2: `[📁] Feature comparison v`)*:
  - When working inside a conversation linked to a matter (`currentChat.matter && currentChat.matter !== 'No matter — general query'`):
  - Renders: `[📁] <Chat Title>  [v]` trigger pill.
  - A clean folder/matter icon directly followed by the active conversation title and subtle chevron arrow.
- **Standalone Chat State (Without Matter)** *(Reference Image 1: `Greeting exchange v`)*:
  - When working inside a general conversation (`currentChat.matter === 'No matter — general query'`):
  - Renders: `<Chat Title>  [v]` trigger pill (no folder icon, clean minimal text with chevron).
- **Floating Context Menu on Click** *(Matches Reference Screenshots)*:
  - Clicking the title pill opens a floating rounded card (`.header-chat-dropdown`):
    - **✏️ Rename** (`⌥⌘R`)
    - **📌 Pin chat / Unpin chat** (`⌥⌘P`)
    - **🔒 Lock chat** (sets read-only permission)
    - *Divider*
    - **🌐 Open on lawvriksh.com** (copies shareable link)
    - *Divider*
    - **🗄️ Archive** (`⇧⌘A`)
    - **🗑️ Delete** (in red `#dc2626` / danger)
    - *Divider*
    - **📁 Move to project >** (moves chat into another matter)
    - **✕ Remove from project** (only shown when inside a matter; detaches back to general chats)
  - Full backdrop dismiss: Clicking anywhere outside automatically closes the dropdown.

---

## 6. Summary of Key Classes & Tokens

| Component | Class Name | Key Properties |
|---|---|---|
| Header Menu Trigger | `.header-chat-menu-trigger` | Rounded pill, hover `#ece8df`, rotating chevron |
| Header Dropdown Card | `.header-chat-dropdown` | `width: 248px`, `border-radius: 14px`, shadow, backdrop dismiss |
| Dropdown Item | `.header-dropdown-item` | 13px, weight 500, hover `#f4f0e8`, shortcut badge |
| Header Folder Icon | `.header-chat-folder-icon` | 17px x 17px, terracotta accent `#a64927` |
| Header Title Text | `.header-chat-title-text` | 14.5px, weight 500, max-width 360px, ellipsis |
| Dynamic Splitter | `.sidebar-section-divider` | `height: 6px`, grab cursor, centered drag pill |
| Matter Row | `.project-row` | `height: 36px`, relative positioning, `#e4dfd5` on hover/active |
| Matter Actions | `.project-row-actions` | `width: 52px`, absolute right, gradient backdrop |
| Matter Chat Actions | `.matter-chat-row-actions` | `width: 32px`, three-dot only, absolute right |
| Title Wrapper | `.title-scroll-container` | `overflow: hidden`, `flex: 1 1 auto` |
| Text Scroll | `.is-overflowing` | Smooth 5.5s marquee alternate animation on row hover |

---

## 7. Dynamic "Files" Header Badge & Context-Aware Drawer

A clean, three-scope drawer architecture providing fluid document grounding into conversations.

### A. Dynamic Header Badge Contract
- **Home / New Conversation (`!activeChat`)**:
  - Badge renders **`Files 0`** (`.files-button b.is-zero`) in muted neutral styling when no documents have been attached.
- **Active / Attached State**:
  - Dynamically increments to **`Files 1`**, **`Files 2`**, etc. (`.files-button b.has-files`) when files are attached via composer, file upload dialog, or drag-and-drop.
- **Matter Conversation State**:
  - Renders the exact count of files attached to that specific conversation (`currentChat.files.length`), rather than the entire matter's archive.

### B. Context-Aware 3-Scope File Drawer
The drawer opens on the right (`.file-drawer`) with three top segmented navigation tabs (`.library-scope-tabs`):

1. **Tab 1: In this chat (`in-chat`)**:
   - Shows documents actively attached to the current conversation.
   - **Empty State**: Minimal dashed container (`.drawer-empty-chat-files`) notifying that 0 files are currently attached, featuring two quick action buttons:
     - `+ Upload file`: Opens native system file dialog.
     - `📂 Browse Matrix`: Switches directly to the matter matrix view.
   - Attached files display removable chips (`✕ Remove`) to unground them anytime.
2. **Tab 2: All files (`all`)**:
   - Displays all documents across the firm/portfolio.
   - Initial lazy-capped display (12 items) with a smooth "Load more documents" button to eliminate freezing or long scroll lag.
   - Real-time search filter by title or matter name.
   - "+ Attach" toggle button immediately adds/removes the document from the conversation.
3. **Tab 3: By Matrix (`matrix`)**:
   - Visual folder matrix cards (`.matrix-cards-list`) categorized by matter.
   - Each card displays folder icon, matter title, and file count pill (`N files`).
   - Clicking a card navigates into that matter's dedicated file repository with breadcrumb header and back button (`← All matrices`).
   - Documents within the matrix can be dragged directly or attached with 1 click.

### C. Drag & Drop Interaction
- Any document card across all three drawer views is natively draggable (`draggable={true}`).
- Dragging over the AI composer triggers the active hover target (`.composer-drop-highlight`).
- Dropping immediately grounds the conversation in that document and attaches it to `currentChatFiles`.

### D. Z-Index Stacking Context & Floating Dock Hierarchy
- **Issue Prevented**: The fixed right-hand floating matter tools dock (`.floating-tools-dock-container`, `z-index: 99`) was overlapping on top of the opened file drawer (`.file-drawer`, previously `z-index: 40`).
- **Stacking Resolution**:
  - `.drawer-scrim`: Elevated to `z-index: 140 !important;`
  - `.file-drawer`: Elevated to `z-index: 150 !important;`
  - `.floating-tools-dock-container.drawer-is-open`: When `drawerOpen` is active, docked tools drop to `z-index: 30 !important;`, `opacity: 0.12`, and `pointer-events: none;`, guaranteeing that the floating island remains completely underneath the drawer without visual or click interference.


