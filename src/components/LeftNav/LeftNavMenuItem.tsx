import { FC, ReactNode } from 'react';

interface ILeftNavMenuItemProps {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: (props?: any) => ReactNode;
  action: () => void;
  className: string;
}

const LeftNavMenuItem: FC<ILeftNavMenuItemProps> = ({
  text,
  icon,
  action,
  className,
}) => {
  return (
    <div
      className={`text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] ${className}`}
      onClick={action}>
      <span className="text-xl mr-5">{icon()}</span>
      <p className="capitalize">{text}</p>
    </div>
  );
};

export default LeftNavMenuItem;
