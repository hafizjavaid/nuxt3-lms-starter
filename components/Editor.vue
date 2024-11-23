<template>
    <div class="overflow-y-auto border flex-1">
        <div v-if="editor" class="flex flex-wrap border-b p-2 bg-white items-center space-x-2">
            <UTooltip v-for="({ slug, active, icon }, index) in editorActions" :text="slug" :ui="{
                base: 'capitalize',
            }">
                <UButton size="sm" color="black" :icon="icon" @click="onActionClick(slug)"
                    :variant="editor.isActive(active) ? 'solid' : 'ghost'" type="button" />
            </UTooltip>
        </div>
        <div class="p-4 bg-white">
            <TiptapEditorContent :editor="editor"></TiptapEditorContent>
        </div>
    </div>
</template>

<script setup lang="ts">
const editor = useEditor({
    content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
    extensions: [TiptapStarterKit],
    editorProps: {
        attributes: {
            class: 'prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc',
        }
    }
})

interface EditorProps {
    modelValue: string | null | undefined;
}

const props = defineProps<EditorProps>();
const emit = defineEmits(['update:modelValue']);

const editorActions: { slug: string; icon: string; active: string }[] = [
    { slug: 'bold', icon: 'i-lucide-bold', active: 'bold' },
    { slug: 'italic', icon: 'i-lucide-italic', active: 'italic' },
    { slug: 'undo', icon: 'i-lucide-undo', active: 'undo' },
    { slug: 'redo', icon: 'i-lucide-redo', active: 'redo' },
    { slug: 'bulletList', icon: 'i-heroicons-list-bullet', active: 'bulletList' },
    { slug: 'orderedList', icon: 'i-lucide-list-ordered', active: 'orderedList' },
    { slug: 'codeBlock', icon: 'i-lucide-code-xml', active: 'codeBlock' },
    { slug: 'blockquote', icon: 'i-lucide-message-square-quote', active: 'blockquote' },
];

watch(() => props.modelValue, (value) => {
    if (editor.value?.getHTML() === value) return;
    editor.value?.commands.setContent(props.modelValue as string, false)
})

const onActionClick = (slug: string) => {

    const vm = editor.value?.chain().focus();
    const actionTriggers: Record<string, Function> = {
        bulletList: () => vm?.toggleBulletList().run(),
        orderedList: () => vm?.toggleOrderedList().run(),
        codeBlock: () => vm?.toggleCodeBlock().run(),
        blockquote: () => vm?.toggleBlockquote().run(),
        bold: () => vm?.toggleBold().run(),
        italic: () => vm?.toggleItalic().run(),
        undo: () => vm?.undo().run(),
        redo: () => vm?.redo().run(),
    };
    actionTriggers[slug]();
}

const handleUpdate = () => {
    emit('update:modelValue', unref(editor)?.getHTML())
}

onBeforeUnmount(() => {
    unref(editor)?.destroy();
})

onMounted(() => {
    if (!!unref(editor)) {
        unref(editor)?.commands.setContent(props.modelValue as string);
        unref(editor)?.on('update', handleUpdate);

    }
})

</script>

<style>
.ProseMirror.ProseMirror-focused {
    border: 0px !important;
    outline: none !important;
    padding: 0px !important;
    margin: 0px !important;
}

.tiptap>*+* {
    margin-top: 0.75em;
}

.tiptap ul,
.tiptap ol {
    padding: 0 1rem;
    list-style: unset !important;
}

.tiptap h1,
.tiptap h2,
.tiptap h3,
.tiptap h4,
.tiptap h5,
.tiptap h6 {
    line-height: 1.1;
}

.tiptap code {
    background-color: rgba(97, 97, 97, 0.1);
    color: #616161;
}

.tiptap pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
}

.tiptap pre code {
    color: inherit;
    padding: 0;
    background: none;
    font-size: 0.8rem;
}

.tiptap img {
    max-width: 100%;
    height: auto;
}

.tiptap blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(13, 13, 13, 0.1);
}

.tiptap hr {
    border: none;
    border-top: 2px solid rgba(13, 13, 13, 0.1);
    margin: 2rem 0;
}
</style>