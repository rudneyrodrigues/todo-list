import logoImg from '../../assets/logo.svg';

export const Header = (): JSX.Element => {
  return (
    <header className="h-48 pb-2 bg-gray-700 px-4 flex flex-col items-center justify-center">
      <img src={logoImg} alt="ToDo List" />
    </header>
  )
}
