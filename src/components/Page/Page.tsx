import "./Page.css";

type PageType = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

function Page({ title, description, children }: PageType) {
  return (
    <div className="page-container flex-center">
      <div className="page-header flex-center">{title && <h1>{title}</h1>}</div>

      <div className="page-content">
        {description && <p className="description">{description}</p>}
        {children}
      </div>
    </div>
  );
}

export default Page;
