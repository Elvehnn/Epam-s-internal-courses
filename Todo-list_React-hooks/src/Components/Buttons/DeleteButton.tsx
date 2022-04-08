interface DeleteButtonProps {
  id: number;
  removeItem: (id: number) => void;
}

const DeleteButton = ({ id, removeItem }: DeleteButtonProps) => {
  return (
    <i id={id.toString()} className="far fa-trash-alt delete" onClick={() => removeItem(id)}></i>
  );
};

export default DeleteButton;
