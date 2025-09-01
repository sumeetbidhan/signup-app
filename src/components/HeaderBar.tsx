import React from 'react';

type HeaderBarProps = {
  title: string;
  subtitle?: string;
};

const HeaderBar: React.FC<HeaderBarProps> = ({ title, subtitle }) => {
  return (
    <div className="card__header">
      <h1 className="card__title">{title}</h1>
      {subtitle && <p className="card__subtitle">{subtitle}</p>}
    </div>
  );
};

export default HeaderBar;

