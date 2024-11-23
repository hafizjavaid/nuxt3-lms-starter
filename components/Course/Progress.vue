<template>
    <div>
        <!-- @vue-expect-error -->
        <UProgress :color="props.variant ? colorByVariant[props.variant] : colorByVariant['default']" :indicator="false"
            :value="value" />
        <p :class="[
            props.variant ? colorByVariant[props.variant] : 'default',
            props.size ? sizeByVariant[props.size] : 'default',
        ]" class="font-medium mt-2 text-sky-700">
            {{ Math.round(value) }}% Complete
        </p>
    </div>
</template>

<script setup lang="ts">
interface CourseProgressProps {
    value: number;
    size?: 'default' | 'sm';
    variant?: 'default' | 'success';
}

const colorByVariant = {
    default: 'primary',
    success: 'green',
};

const sizeByVariant = {
    default: 'text-sm',
    sm: 'text-xs',
};

const props = defineProps<CourseProgressProps>();
</script>

<style scoped></style>