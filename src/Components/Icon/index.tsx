import React from 'react';
import styles from './index.module.scss';

interface IIconProps {
    name: string;
    className?: string;
    fill?: string
}

const Icon = (props: IIconProps) => {
    
    const { name, className = '' } = props;

    return (
        <svg
            className={`${styles.icon} ${className}`}
            dangerouslySetInnerHTML={{
                __html: `<use xlink:href="/icons/sprite.svg#${name}"></use>`,
            }}
        />
    );
};

export default Icon;