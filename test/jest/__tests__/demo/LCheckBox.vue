<template>
  <div>
    {{ $t('label.button') }}
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
  computed: {
    icon() {
      if (this.modelValue === true) {
        return this.iconTrue;
      }
      if (this.tristate) {
        if (this.modelValue !== false) {
          return this.iconNull;
        }
      }
      return this.iconFalse;
    },
  },
  methods: {
    switchState() {
      if (this.modelValue == true) {
        this.$emit('update:modelValue', false);
      } else if (this.modelValue == false) {
        this.$emit('update:modelValue', this.tristate ? null : true);
      } else {
        this.$emit('update:modelValue', true);
      }
    },
  },
  setup() {
    return {
      hello: 'hello',
    };
  },
});
</script>

<style scoped lang="scss"></style>
