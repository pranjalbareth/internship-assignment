import { Button } from 'antd';

export default function AntButton({ children, ...props }) {
  return (
    <Button
      type="primary"
      {...props}
    >
      {children}
    </Button>
  );
}
