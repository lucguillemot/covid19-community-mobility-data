import * as React from "react";
import * as CKA from "@chakra-ui/react";

export const ChartTitle = ({ title }: { title: React.ReactNode }) => (
  <CKA.Box
    as="figcaption"
    sx={{
      textTransform: "uppercase",
      fontSize: 12,
      fontWeight: 700,
      maxWidth: "40em",
      my: 4,
    }}
  >
    {title}
  </CKA.Box>
);
