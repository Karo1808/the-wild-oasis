import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useCloseModal } from "../hooks/useCloseModal";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface StyledListProps {
  position?: {
    x?: number;
    y?: number;
  };
  ref: React.RefObject<HTMLDivElement>;
}

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props?.position?.x}px;
  top: ${(props) => props?.position?.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface PositionType {
  Position?: {
    x: number;
    y: number;
  };
}

interface MenusContextTypes extends PositionType {
  openId?: number;
  close?: () => void;
  open?: Dispatch<SetStateAction<number>>;
  position?: {
    x?: number;
    y?: number;
  };
  setPosition?: Dispatch<SetStateAction<PositionType>>;
}

const MenusContext = createContext<MenusContextTypes>({});

const Menus = ({ children }: { children: React.ReactNode }) => {
  const [openId, setOpenId] = useState(0);
  const [position, setPosition] = useState({});
  const close = () => setOpenId(0);
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }: { id?: string }) => {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  const handleClick = (e: React.MouseEvent<EventTarget>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const rect = target?.closest("button")?.getBoundingClientRect();
    setPosition?.({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      x: window.innerWidth - rect?.width - rect?.x,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      y: rect?.y + rect?.height + 8,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    openId === 0 || openId !== id ? open?.(id) : close?.();
  };

  return (
    <StyledToggle onClick={(e: React.MouseEvent) => handleClick(e)}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ id, children }: { id?: string; children: React.ReactNode }) => {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useCloseModal(close, false);

  if (id !== openId) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button = ({
  children,
  icon,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  icon: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close?.();
  };
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.Button = Button;
Menus.List = List;

export default Menus;
