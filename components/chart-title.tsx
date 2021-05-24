import * as React from "react";
import * as CKA from "@chakra-ui/react";

export const ChartTitle = ({
  title,
  description,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
}) => (
  <CKA.Box as="figcaption" sx={{ my: 4 }}>
    <CKA.Box
      sx={{
        textTransform: "uppercase",
        fontSize: 18,
        fontWeight: 500,
        maxWidth: "40em",
      }}
    >
      {title}
    </CKA.Box>
    <CKA.Box
      sx={{
        textTransform: "uppercase",
        fontSize: 11,
        fontWeight: 500,
        maxWidth: "40em",
        color: "gray.500",
      }}
    >
      {description}
    </CKA.Box>
  </CKA.Box>
);
