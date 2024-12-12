import { ObjectHTMLAttributes } from "react";
import { Button } from "../ui/button";

type ButtonProps = {
    onClick?: () => void;
    name: string;
    style: string;
  };

function ActionButton({onClick, name, style}:ButtonProps) {
    return (
            <Button  className={style} onClick={onClick}>{name}</Button>
    )
} export default ActionButton;