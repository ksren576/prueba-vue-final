import { shallowMount } from "@vue/test-utils";
import Card from "@/components/Card.vue";

describe("Card.vue", () => {
  it("Render básico con props", () => {
    const props = {
      titulo: "Hola",
      texto: "Texto prueba",
      urlImagen: "http://url-test"
    };

    const wrapper = shallowMount(Card, {
      propsData: props,
    });
    expect(wrapper.find('h1').text()).toMatch(props.titulo);
    expect(wrapper.find('p').text()).toMatch(props.texto);
    expect(wrapper.find('img').attributes('src')).toMatch(props.urlImagen);
  });
});
