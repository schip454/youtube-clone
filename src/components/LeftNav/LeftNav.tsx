import { FC, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { changeSelectedCategory } from '../../redux/video/slice';
import { toggleMobileMenu } from '../../redux/search/slice';

import { categories } from '../../utils/constants';

import LeftNavMenuItem from './LeftNavMenuItem';

const LeftNav: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedCategory } = useAppSelector((state) => state.video);
  const { mobileMenu } = useAppSelector((state) => state.search);

  const navigate = useNavigate();

  const clickHandler = (name: string, type: string) => {
    if (type === 'category' || type === 'home')
      dispatch(changeSelectedCategory(name));

    dispatch(toggleMobileMenu(false));
  };
  return (
    <div
      className={` left-0 top-[56px] w-[240px]   overflow-y-auto h-full py-4 bg-black fixed md:fixed z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
        mobileMenu ? '!translate-x-0' : 0
      }`}>
      <div className="flex px-5 flex-col ">
        {categories?.map(({ type, name, icon, divider }) => {
          return (
            <Fragment key={name}>
              <LeftNavMenuItem
                text={type === 'home' ? 'Home' : name}
                icon={icon}
                action={() => {
                  clickHandler(name, type);
                  navigate('/');
                }}
                className={`${
                  selectedCategory === name ? 'bg-white/[0.15]' : ''
                }`}
              />
              {divider && <hr className="my-5 border-white/[0.2]" />}
            </Fragment>
          );
        })}
        <hr className="my-5 border-white/[0.2]" />
        <div className="text-white/[0.5] text-[12px]">© 2024 schip454</div>
      </div>
    </div>
  );
};

export default LeftNav;
