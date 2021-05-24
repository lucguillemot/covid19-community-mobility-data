import * as React from "react";
import * as CKA from "@chakra-ui/react";

export const Paragraph = ({
  sx,
  children,
}: {
  sx?: any;
  children: React.ReactNode;
}) => (
  <CKA.Text sx={{ my: 6, fontSize: "xl", ...sx }} as="p">
    {children}
  </CKA.Text>
);
