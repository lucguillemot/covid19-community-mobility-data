import * as React from "react";
import * as CKA from "@chakra-ui/react";

export const ChartFigure = ({ children }: { children: React.ReactNode }) => (
  <CKA.Box as="figure" sx={{ bg: "muted", p: [4, 10] }}>
    {children}
  </CKA.Box>
);

export const ChartTitle = ({
  title,
  description,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
}) => (
  <CKA.Box as="figcaption" sx={{ mt: 4 }}>
    <CKA.Box
      sx={{
        textTransform: "uppercase",
        fontSize: 18,
        fontWeight: 500,
        maxWidth: "40em",
        lineHeight: 1.2,
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
