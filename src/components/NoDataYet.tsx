interface NoDataYetProps {
  title: string;
  subTitle: string;
  icon: React.ReactNode;
}

export const NoDataYet = (props: NoDataYetProps) => {
  return (
    <div className="p-6">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-4xl text-gray-400 mb-4">{props.icon}</div>
        <h2 className="text-xl font-semibold text-gray-800">{props.title}</h2>
        <p className="text-gray-600">{props.subTitle}</p>
      </div>
    </div>
  );
};
