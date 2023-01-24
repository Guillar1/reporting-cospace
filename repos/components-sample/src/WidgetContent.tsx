import "./WidgetContent.scss";

export const WidgetContent = ({ children }: { children?: React.ReactNode }) => (
  <div className="widget-content">{children}</div>
);
