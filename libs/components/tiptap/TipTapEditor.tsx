import { Dropdown, Icon, Menu, MenuItem } from '@app/components'
import { TipTapProps } from '@app/types'
import { EditorContent } from '@tiptap/react'
import React, { useEffect, useMemo } from 'react'
import { EditorContainer } from './element'

export const TipTapEditor: React.FC<TipTapProps> = ({ editor, value = '', showToolbar = true, className, style }) => {
  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== undefined) {
      const currentMarkdown = editor.getMarkdown() || ''
      // Only update if the content is different to avoid infinite loops
      if (currentMarkdown !== value) {
        editor.commands.setContent(value || '', { contentType: 'markdown' })
      }
    }
  }, [value, editor])

  const getHeadingLevel = () => {
    if (!editor) return 'Text'
    if (editor.isActive('heading', { level: 1 })) return 'H1'
    if (editor.isActive('heading', { level: 2 })) return 'H2'
    if (editor.isActive('heading', { level: 3 })) return 'H3'
    if (editor.isActive('heading', { level: 4 })) return 'H4'
    if (editor.isActive('heading', { level: 5 })) return 'H5'
    if (editor.isActive('heading', { level: 6 })) return 'H6'
    return 'Text'
  }

  const headingMenu = useMemo(() => {
    if (!editor) return null
    return (
      <Menu>
        <MenuItem
          key="paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={!editor.isActive('heading') && editor.isActive('paragraph') ? 'ant-menu-item-selected' : ''}
        >
          Text
        </MenuItem>
        <MenuItem
          key="h1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'ant-menu-item-selected' : ''}
        >
          Heading 1
        </MenuItem>
        <MenuItem
          key="h2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'ant-menu-item-selected' : ''}
        >
          Heading 2
        </MenuItem>
        <MenuItem
          key="h3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'ant-menu-item-selected' : ''}
        >
          Heading 3
        </MenuItem>
        <MenuItem
          key="h4"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'ant-menu-item-selected' : ''}
        >
          Heading 4
        </MenuItem>
        <MenuItem
          key="h5"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'ant-menu-item-selected' : ''}
        >
          Heading 5
        </MenuItem>
        <MenuItem
          key="h6"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'ant-menu-item-selected' : ''}
        >
          Heading 6
        </MenuItem>
      </Menu>
    )
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <EditorContainer className={className} style={style}>
      {showToolbar && editor && (
        <div className="tiptap-toolbar">
          {headingMenu && (
            <Dropdown overlay={headingMenu} trigger={['click']} placement="bottomLeft">
              <button
                type="button"
                className={`heading-dropdown-button ${editor.isActive('heading') ? 'is-active' : ''}`}
                title="Heading"
              >
                <span>{getHeadingLevel()}</span>
                <Icon.DownOutlined style={{ fontSize: 12, marginLeft: 4 }} />
              </button>
            </Dropdown>
          )}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
            type="button"
            title="Bold"
          >
            <Icon.BoldOutlined />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            type="button"
            title="Italic"
          >
            <Icon.ItalicOutlined />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
            type="button"
            title="Underline"
          >
            <Icon.UnderlineOutlined />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
            type="button"
            title="Bullet List"
          >
            <Icon.UnorderedListOutlined />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
            type="button"
            title="Numbered List"
          >
            <Icon.OrderedListOutlined />
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            type="button"
            title="Horizontal Line"
          >
            <Icon.MinusOutlined />
          </button>
        </div>
      )}
      <div className={`tiptap-editor-wrapper ${!showToolbar ? 'no-toolbar' : ''}`}>
        <EditorContent editor={editor} />
      </div>
    </EditorContainer>
  )
}
