export interface IAppBarIcon {
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  href: string;
  isMobileOnly: boolean;
  tooltip: string;
}
