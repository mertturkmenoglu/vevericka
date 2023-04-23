import { ProfileItemFragment } from '../../generated/graphql';

export interface AboutProps {
  user: ProfileItemFragment;
}

export interface AboutItemProps {
  title: string;
  content?: string | null | undefined;
  link?: boolean;
}

function AboutItem({ title, content = '', link = false }: AboutItemProps): JSX.Element {
  if (!content) {
    return <></>;
  }

  return (
    <div className="flex flex-col space-y-2">
      <span className="text-sm text-neutral-400">{title}</span>
      {link && (
        <a
          href={content ?? '#'}
          className="block text-lg font-medium text-berry hover:underline"
        >
          {content}
        </a>
      )}
      {!link && <span className="text-lg font-medium">{content}</span>}
    </div>
  );
}

function About({ user }: AboutProps): JSX.Element {
  return (
    <div className="mt-4 grid grid-cols-3 gap-y-4">
      <AboutItem
        title="Job"
        content={user.job}
      />

      <AboutItem
        title="School"
        content={user.school}
      />

      <AboutItem
        title="Bio"
        content={user.description}
      />

      <AboutItem
        title="Location"
        content={user.country}
      />

      <AboutItem
        title="Gender"
        content={user.gender}
      />

      <AboutItem
        title="Joined"
        content={new Date(user.createdAt).toLocaleDateString()}
      />

      <AboutItem
        title="Website"
        link
        content={user.website}
      />
    </div>
  );
}

export default About;
