import { shallowMount } from "@vue/test-utils";
import Error404 from "@/views/Error404.vue";

describe("Error404.vue", () => {
  it("Render básico", () => {
    const wrapper = shallowMount(Error404);
    expect(wrapper.find('h3').text()).toMatch('La página solicitada no existe.');
    expect(wrapper.find('div').classes()).toContain('container');
  });
});
