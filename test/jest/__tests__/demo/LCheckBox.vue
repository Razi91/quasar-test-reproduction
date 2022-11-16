<template>
  <div>
    <q-btn
      data-cy="LCheckboxIcon.btn"
      :size="size"
      :flat="!unelevated"
      :unelevated="unelevated"
      round
      :icon="icon"
      :title="titleTooltip ? '' : title"
      :color="color"
      @click="switchState"
    >
      <q-tooltip v-if="titleTooltip">
        {{ title }}
      </q-tooltip>
    </q-btn>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'LCheckboxIcon',
  props: {
    titleTooltip: { type: Boolean, default: false },
    modelValue: {
      type: [Boolean, Object] as PropType<boolean | null>,
      deafault: null,
    },
    title: { type: String, required: true },
    size: { type: String, default: 'sm' },
    unelevated: { type: Boolean, default: false },
    tristate: { type: Boolean, default: false },
    iconTrue: { type: String, default: 'check_box' },
    iconFalse: { type: String, default: 'check_box_outline_blank' },
    iconNull: { type: String, default: 'indeterminate_check_box' },
    color: { type: String, default: 'primary' },
    invert: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const icon = computed(() => {
      if (props.modelValue === true) {
        return props.iconTrue;
      }
      if (props.tristate) {
        if (props.modelValue !== false) {
          return props.iconNull;
        }
      }
      return props.iconFalse;
    });
    return {
      icon,
      switchState: () => {
        if (props.modelValue == true) {
          ctx.emit('update:modelValue', false);
        } else if (props.modelValue == false) {
          ctx.emit('update:modelValue', props.tristate ? null : true);
        } else {
          ctx.emit('update:modelValue', true);
        }
      },
    };
  },
});
</script>

<style scoped lang="scss"></style>
