"use client";

import Image from "next/image";

const FONT = "'Montserrat', sans-serif";
const FONT_INTER = "'Inter', sans-serif";
const GRAY_600 = "#5E6470";
const GRAY_900 = "#1A1C21";
const BORDER_COLOR = "#8A9099";

export default function InvoicePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F9FAFC",
        display: "flex",
        justifyContent: "center",
        padding: "16px 20px",
        fontFamily: FONT,
      }}
    >
      {/* Invoice Container */}
      <div
        style={{
          width: 595,
          maxWidth: "100%",
          position: "relative",
          background: "#F9FAFC",
        }}
      >
        {/* Invoice Heading */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px 32px",
            width: "100%",
            height: 90,
            background: "#FFFFFF",
            borderRadius: 7,
            boxSizing: "border-box",
            marginBottom: 7,
          }}
        >
          <span
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: 600,
              fontSize: 42,
              lineHeight: "150%",
              display: "flex",
              alignItems: "center",
              textTransform: "uppercase",
              color: "#000000",
            }}
          >
            Invoice
          </span>
        </div>

        {/* Header Banner */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 20px",
            background:
              "radial-gradient(50% 89.52% at 50% 50%, #FFFFFF 0%, #FFA4A9 100%)",
            borderRadius: "8px 8px 0px 0px",
            height: 76,
          }}
        >
          <Image
            src="/images/Zirwa.png"
            alt="Zirwa Qurbani Service"
            width={118}
            height={60}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* TAX INVOICE Title */}
        <div
          style={{
            textAlign: "center",
            padding: "20px 0 16px",
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 16.4,
              lineHeight: "23px",
              color: GRAY_600,
            }}
          >
            TAX INVOICE
          </span>
        </div>

        {/* Main Card */}
        <div
          style={{
            width: 563,
            margin: "0 auto",
            background: "#FFFFFF",
            border: "0.5px solid #D7DAE0",
            borderRadius: 12,
            padding: "12px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Info Row: 3 columns */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: 540,
              gap: 20,
            }}
          >
            {/* Column 1: Billed to + Delivery Address */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                width: 128,
              }}
            >
              {/* Billed to */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontWeight: 500,
                    fontSize: 10,
                    lineHeight: "14px",
                    color: GRAY_600,
                  }}
                >
                  Billed to
                </span>
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontWeight: 600,
                    fontSize: 10,
                    lineHeight: "14px",
                    color: GRAY_900,
                  }}
                >
                  Walter White
                </span>
              </div>
              {/* Delivery Address */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontWeight: 500,
                    fontSize: 10,
                    lineHeight: "14px",
                    color: GRAY_600,
                  }}
                >
                  Delivery Address
                </span>
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontWeight: 600,
                    fontSize: 10,
                    lineHeight: "14px",
                    color: GRAY_900,
                  }}
                >
                  No.25, Paper Street,
                  <br />
                  Chennai - 600 028
                </span>
              </div>
            </div>

            {/* Column 2: Payment Method + Invoice date */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontWeight: 500,
                    fontSize: 10,
                    lineHeight: "14px",
                    color: GRAY_600,
                  }}
                >
                  Payment Method
                </span>
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontWeight: 600,
                    fontSize: 10,
                    lineHeight: "14px",
                    color: GRAY_900,
                  }}
                >
                  Cash on Delivery
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontWeight: 500,
                    fontSize: 10,
                    lineHeight: "14px",
                    color: GRAY_600,
                  }}
                >
                  Invoice date
                </span>
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontWeight: 600,
                    fontSize: 10,
                    lineHeight: "14px",
                    color: GRAY_900,
                  }}
                >
                  01 Aug, 2023
                </span>
              </div>
            </div>

            {/* Column 3: Invoice number + Order ID */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontWeight: 500,
                    fontSize: 10,
                    lineHeight: "14px",
                    color: GRAY_600,
                  }}
                >
                  Invoice number
                </span>
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontWeight: 600,
                    fontSize: 10,
                    lineHeight: "14px",
                    color: GRAY_900,
                  }}
                >
                  #AB2324-01
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontWeight: 500,
                    fontSize: 10,
                    lineHeight: "14px",
                    color: GRAY_600,
                  }}
                >
                  Order ID
                </span>
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontWeight: 600,
                    fontSize: 10,
                    lineHeight: "14px",
                    color: GRAY_900,
                  }}
                >
                  INV-057
                </span>
              </div>
            </div>
          </div>

          {/* Bill Table */}
          <div
            style={{
              width: 540,
              border: `0.67px solid #878787`,
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            {/* Table Header */}
            <div
              style={{
                display: "flex",
                background: "#FFD8DA",
                borderRadius: "8px 8px 0 0",
                height: 26.3,
              }}
            >
              <TableCell width={77} borderLeft={false} bold>
                <span style={{ transform: "rotate(-70deg)", display: "inline-block" }}>#</span>
              </TableCell>
              <TableCell width={232} bold>Description</TableCell>
              <TableCell width={77} bold>Quantity (kg)</TableCell>
              <TableCell width={77} bold>Unit Fee</TableCell>
              <TableCell width={77} bold>Fee Amount</TableCell>
            </div>

            {/* Row 1: Qurban service */}
            <TableRow bg="#F1F1F1">
              <TableCell width={77} borderLeft={false}>1.</TableCell>
              <TableCell width={232}>Qurban service</TableCell>
              <TableCell width={77} center>2</TableCell>
              <TableCell width={77}>₹ 18,500.00</TableCell>
              <TableCell width={77}>₹ 37,000.00</TableCell>
            </TableRow>

            {/* Row 2: Time Slot */}
            <TableRow bg="#FFFFFF">
              <TableCell width={77} borderLeft={false}></TableCell>
              <TableCell width={232}>
                <span style={{ fontWeight: 600 }}>
                  Time Slot =&gt; Day 1, 7:00 AM - 9:00 AM
                </span>
              </TableCell>
              <TableCell width={77}></TableCell>
              <TableCell width={77}></TableCell>
              <TableCell width={77}></TableCell>
            </TableRow>

            {/* Empty Row 3 */}
            <TableRow bg="#F1F1F1">
              <TableCell width={77} borderLeft={false}></TableCell>
              <TableCell width={232}></TableCell>
              <TableCell width={77}></TableCell>
              <TableCell width={77}></TableCell>
              <TableCell width={77}></TableCell>
            </TableRow>

            {/* Empty Row 4 */}
            <TableRow bg="#FFFFFF">
              <TableCell width={77} borderLeft={false}></TableCell>
              <TableCell width={232}></TableCell>
              <TableCell width={77}></TableCell>
              <TableCell width={77}></TableCell>
              <TableCell width={77}></TableCell>
            </TableRow>

            {/* Empty Row 5 */}
            <TableRow bg="#F1F1F1">
              <TableCell width={77} borderLeft={false}></TableCell>
              <TableCell width={232}></TableCell>
              <TableCell width={77}></TableCell>
              <TableCell width={77}></TableCell>
              <TableCell width={77}></TableCell>
            </TableRow>

            {/* Empty Row 6 */}
            <TableRow bg="#FFFFFF">
              <TableCell width={77} borderLeft={false}></TableCell>
              <TableCell width={232}></TableCell>
              <TableCell width={77}></TableCell>
              <TableCell width={77}></TableCell>
              <TableCell width={77}></TableCell>
            </TableRow>

            {/* Row 7: Delivery Charge */}
            <TableRow bg="#F1F1F1">
              <TableCell width={77} borderLeft={false}></TableCell>
              <TableCell width={232}>Delivery Charge</TableCell>
              <TableCell width={77}></TableCell>
              <TableCell width={77}>₹ 0.00</TableCell>
              <TableCell width={77}>₹ 0.00</TableCell>
            </TableRow>

            {/* Row 8: Coupon Discount */}
            <TableRow bg="#FFFFFF">
              <TableCell width={77} borderLeft={false}></TableCell>
              <TableCell width={232}>Coupon Discount</TableCell>
              <TableCell width={77}></TableCell>
              <TableCell width={77}>₹ 600.00</TableCell>
              <TableCell width={77}>₹ 1,200.00</TableCell>
            </TableRow>

            {/* Separator Row (bottom border) */}
            <TableRow bg="#F1F1F1" borderBottom>
              <TableCell width={77} borderLeft={false}></TableCell>
              <TableCell width={232}></TableCell>
              <TableCell width={77}></TableCell>
              <TableCell width={77}></TableCell>
              <TableCell width={77}></TableCell>
            </TableRow>

            {/* Subtotal Row */}
            <TableRow bg="#FFFFFF">
              <TableCell width={77} borderLeft={false}></TableCell>
              <TableCell width={232} borderLeft={false}></TableCell>
              <TableCell width={77} borderLeft={false}></TableCell>
              <TableCell width={77} borderLeftSolid>
                <span style={{ fontWeight: 600, color: "#017A59" }}>SubTotal</span>
              </TableCell>
              <TableCell width={77} borderLeftSolid>₹ 37,000.00</TableCell>
            </TableRow>

            {/* Discount Row */}
            <TableRow bg="#FFFFFF">
              <TableCell width={77} borderLeft={false}></TableCell>
              <TableCell width={232} borderLeft={false}></TableCell>
              <TableCell width={77} borderLeft={false}></TableCell>
              <TableCell width={77} borderLeftSolid>
                <span style={{ fontWeight: 600, color: "#1D1D1F" }}>Discount</span>
              </TableCell>
              <TableCell width={77} borderLeftSolid>
                <span style={{ color: "#119604" }}>-₹ 1,200.00</span>
              </TableCell>
            </TableRow>

            {/* Grand Total Row */}
            <TableRow bg="#FFFFFF" last>
              <TableCell width={77} borderLeft={false}></TableCell>
              <TableCell width={232} borderLeft={false}></TableCell>
              <TableCell width={77} borderLeft={false}></TableCell>
              <TableCell width={77} borderLeftSolid>
                <span style={{ fontWeight: 600, color: "#ED0213" }}>Grand Total</span>
              </TableCell>
              <TableCell width={77} borderLeftSolid>₹35,800.00</TableCell>
            </TableRow>
          </div>
        </div>

        {/* Footer Query Text */}
        <div
          style={{
            textAlign: "center",
            marginTop: 24,
            paddingBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: 8.3,
              lineHeight: "10px",
              color: "#1D1D1F",
            }}
          >
            For any queries, please contact us at query@zirwaqurbani.in
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Helper Components ── */

function TableRow({
  children,
  bg,
  borderBottom,
  last,
}: {
  children: React.ReactNode;
  bg: string;
  borderBottom?: boolean;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        background: bg,
        height: 18.79,
        ...(borderBottom
          ? { borderBottom: `1.39px solid ${BORDER_COLOR}` }
          : {}),
        ...(last
          ? { borderRadius: "0 0 8px 8px" }
          : {}),
      }}
    >
      {children}
    </div>
  );
}

function TableCell({
  children,
  width,
  borderLeft = true,
  borderLeftSolid,
  bold,
  center,
}: {
  children?: React.ReactNode;
  width: number;
  borderLeft?: boolean;
  borderLeftSolid?: boolean;
  bold?: boolean;
  center?: boolean;
}) {
  return (
    <div
      style={{
        width,
        flex: width === 232 ? "0 0 232px" : "1",
        display: "flex",
        alignItems: "center",
        padding: "1.88px 5.64px",
        boxSizing: "border-box",
        borderLeft:
          borderLeftSolid
            ? `1.39px solid ${BORDER_COLOR}`
            : borderLeft
              ? `1.39px solid ${BORDER_COLOR}`
              : "none",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: bold ? 600 : 500,
        fontSize: 7.78,
        lineHeight: "9px",
        color: "#1D1D1F",
        justifyContent: center ? "center" : undefined,
      }}
    >
      {children}
    </div>
  );
}
