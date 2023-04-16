import { useLocation } from 'react-router-dom';

export function usePageName(): string {
  const location = useLocation();
  const pathname = location.pathname.split('/')[1];

  if (pathname === 'create') {
    return 'New Post';
  }

  if (pathname === 'search') {
    return 'Search';
  }

  if (pathname === 'notifications') {
    return 'Notifications';
  }

  if (pathname === 'messages') {
    return 'Messages';
  }

  if (pathname === 'settings') {
    return 'Settings';
  }

  if (pathname === 'u') {
    return 'User Details';
  }

  if (pathname === 'bookmarks') {
    return 'Bookmarks';
  }

  if (pathname === 'explore') {
    return 'Explore';
  }
  return 'Vevericka';
}
