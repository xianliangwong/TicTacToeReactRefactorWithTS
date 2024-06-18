import "./Modal.css";

type Props = {
  message: string;
  onClick(): void;
};

export default function Modal({ message, onClick }: Props) {
  return (
    <>
      <div className="winning-screen " data-id="winning-screen">
        <div className="winning-screen-content">
          <p>{message}</p>
          <button onClick={onClick}>Play again</button>
        </div>
      </div>
    </>
  );
}
