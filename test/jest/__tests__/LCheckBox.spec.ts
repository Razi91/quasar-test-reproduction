import LCheckboxIcon from './demo/LCheckBox.vue';
import { mount } from '@vue/test-utils';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { describe, expect, it } from '@jest/globals';

import { nextTick } from 'vue';
installQuasarPlugin();

export async function flushAllPromises() {
  await nextTick();
}

const el = (t: string) => `[data-cy="LCheckboxIcon.${t}"]`;

describe('LCheckboxIcon', () => {
  it('uses proper icon', async () => {
    // @ts-ignore
    const wrapper = mount(LCheckboxIcon, {
      props: {
        modelValue: true,
        iconTrue: 'visibility',
        iconFalse: 'visibility_off',
        title: 'test',
      },
      global: {
        mocks: {
          $t: (str: string) => str.toLowerCase(),
        },
      },
    });
    expect(wrapper.find('[role="img"]').text()).toBe('visibility');
    await wrapper.setProps({
      modelValue: false,
      iconTrue: 'visibility',
      iconFalse: 'visibility_off',
      title: 'test',
    });
    expect(wrapper.find('[role="img"]').text()).toBe('visibility_off');
  });
  it('changes state', async () => {
    // @ts-ignore
    const wrapper = mount(LCheckboxIcon, {
      props: { modelValue: true, title: 'test' },
      global: {
        mocks: {
          $t: (str: string) => str.toLowerCase(),
        },
      },
    });
    await wrapper.find(el('btn')).trigger('click');
    expect(wrapper.emitted()['update:modelValue']?.length).toBe(1);
    // @ts-ignore
    expect(wrapper.emitted()['update:modelValue']![0][0]).toBe(false);
    await wrapper.setProps({
      modelValue: false,
    });
    await wrapper.find(el('btn')).trigger('click');
    expect(wrapper.emitted()['update:modelValue']?.length).toBe(2);
    // @ts-ignore
    expect(wrapper.emitted()['update:modelValue']![1][0]).toBe(true);
  });
  it('changes state with tristate', async () => {
    // @ts-ignore
    const wrapper = mount(LCheckboxIcon, {
      props: {
        tristate: true,
        modelValue: true,
        title: 'test',
      },
      global: {
        mocks: {
          $t: (str: string) => str.toLowerCase(),
        },
      },
    });
    await wrapper.find(el('btn')).trigger('click');
    expect(wrapper.emitted()['update:modelValue']?.length).toBe(1);
    // @ts-ignore
    expect(wrapper.emitted()['update:modelValue']![0][0]).toBe(false);
    await wrapper.setProps({
      tristate: true,
      modelValue: false,
    });
    await flushAllPromises();
    await wrapper.find(el('btn')).trigger('click');
    expect(wrapper.emitted()['update:modelValue']?.length).toBe(2);
    // @ts-ignore
    expect(wrapper.emitted()['update:modelValue']![1][0]).toBe(null);
    await wrapper.setProps({
      tristate: true,
      modelValue: null,
    });
    await wrapper.find(el('btn')).trigger('click');
    expect(wrapper.emitted()['update:modelValue']?.length).toBe(3);
    // @ts-ignore
    expect(wrapper.emitted()['update:modelValue']![2][0]).toBe(true);
  });
});
