import { shallowMount } from '@vue/test-utils';
import UserCard from '@/components/UserCard.vue';

describe('UserCard Unit Tests', () => {
  let user: any;
  let wrapper: any;

  beforeAll(() => {
    user = {
      'name': 'Test User',
      'username': 'testuser',
      'image': 'https://example.com/testuser.png',
    };
  });

  beforeEach(() => {
    wrapper = shallowMount(UserCard, {
      propsData: { user },
    });
  });

  it('Renders props.name when passed', () => {
    const div = wrapper.find('#user-name-text');
    expect(div.text()).toContain(user.name);
  });

  it('Renders props.username when passed', () => {
    const div = wrapper.find('#username-text');
    expect(div.text()).toContain(user.username);
  });

  it('Renders props.image when passed', () => {
    const img = wrapper.find('#user-image');
    expect(img.attributes().src).toEqual(user.image);
  });
});
