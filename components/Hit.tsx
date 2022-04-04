export function Hit({ hit }: any) {
  return (
    <article>
      <p>{hit.name}</p>
      <p>{hit.username}</p>

      <img src={hit.image} alt="" />
      <hr />
    </article>
  );
}
