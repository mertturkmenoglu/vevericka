export function useBannerStyles(bannerImage: string): React.CSSProperties {
  if (bannerImage !== 'banner.png') {
    return {
      backgroundImage: `url(${bannerImage})`,
    };
  }

  return {
    backgroundColor: '#e5e5e5',
  };
}
