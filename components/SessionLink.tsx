type Props = {
  id: number;
};

export default function SessionLink({ id }: Props) {
  const link = `${Deno.env.get("HOST")}/${id}`;
  return <a style="text-decoration:underline" href={link}>{id}</a>;
}
