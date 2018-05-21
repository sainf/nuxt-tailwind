// Import the `mount()` method from the test utils
// and the component you want to test
import { shallow, mount } from '@vue/test-utils'
import Sidebar from '../../src/js/sidebar.vue'

describe('Testing Sidebar', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(Sidebar)

  it('Sidebar is there...', () => {
    expect(wrapper.html())
  })

  it('Opening Sidebar', () => {
    // Initial Sidebar is closed
    expect(wrapper.vm.showSidebar).toBe(false)
    const button = wrapper.find('.c-sidebar__button')
    button.trigger('click')
    // After Click the data showSidebar must be true to open the Sidebar
    expect(wrapper.vm.showSidebar).toBe(true)
  })
})
