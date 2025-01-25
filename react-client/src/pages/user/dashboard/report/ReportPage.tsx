import React, { useState } from "react";
import RangeDatePicker from "../../../../components/forms/RangeDatePicker";

const ReportPage: React.FC = () => {
  const [date, setDate] = useState<{
    from: Date;
    to: Date;
  }>({ from: new Date(), to: new Date() });
  return (
    <div>
      <RangeDatePicker date={date} setDate={setDate}  />
    </div>
  );
};

export default ReportPage;
