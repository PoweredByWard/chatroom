const RedButton = (props) => {
  return (
    <button
      class={`flex items-center justify-center bg-red-500 disabled:bg-red-800 hover:bg-red-600 rounded-xl text-white px-4 py-1 flex-shrink-0 ${props.class}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
const BlueButton = (props) => {
  return (
    <button
      class={`flex items-center justify-center bg-blue-500 disabled:bg-blue-800 hover:bg-blue-600 rounded-xl text-white px-4 py-1 flex-shrink-0 ${props.class}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
const GrayButton = (props) => {
  return (
    <button
      class={`flex items-center justify-center bg-gray-500 disabled:bg-gray-700 hover:bg-gray-600 rounded-xl text-white px-4 py-1 flex-shrink-0 ${props.class}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export { RedButton, BlueButton, GrayButton };
