import IconBase from '~/components/IconBase';

type Props = {
  className?: string;
  isInverted?: boolean;
};

export default function IconSoundcloud(props: Props): JSX.Element {
  return (
    <IconBase
      path="M928 0h-832c-52.8 0-96 43.2-96 96v832c0 52.8 43.2 96 96 96h832c52.8 0 96-43.2 96-96v-832c0-52.8-43.2-96-96-96zM176 704h-32l-16-96 16-96h32l16 96-16 96zM304 704h-32l-16-128 16-128h32l16 128-16 128zM432 704h-32l-16-192 16-192h32l16 192-16 192zM825.2 704c-2 0-301.2-0.2-301.4-0.2-6.4-0.6-11.6-6.2-11.8-12.8v-345.2c0-6.4 2.2-9.6 10.4-12.8 21.2-8.2 45-13 69.6-13 100.2 0 182.4 76.8 191.2 175 13-5.4 27.2-8.4 42-8.4 60 0 108.8 48.8 108.8 108.8s-48.8 108.6-108.8 108.6z"
      {...props}
    />
  );
}
