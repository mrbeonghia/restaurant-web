import React from "react";
const Svgs = {
  delete: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
      <path data-name="Path 508" d="M0 0h20v20H0Z" fill="none" />
      <path data-name="Path 509" d="M0 0h20v20H0Z" fill="none" />
      <path
        data-name="Path 510"
        d="M5 15.833A1.672 1.672 0 0 0 6.667 17.5h6.667a1.672 1.672 0 0 0 1.667-1.667v-10h-10ZM7.05 9.9l1.175-1.175L10 10.492l1.767-1.767L12.942 9.9l-1.767 1.767 1.767 1.767-1.175 1.174L10 12.841l-1.766 1.767-1.175-1.175 1.767-1.767Zm5.867-6.567-.833-.833H7.917l-.833.833H4.167V5h11.667V3.333Z"
        fill="#df0606"
      />
    </svg>
  ),
  noSelect: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <g data-name="Group 8370">
        <path data-name="Rectangle 2943" fill="none" d="M0 0h24v24H0z" />
      </g>
      <g data-name="Group 8372">
        <g data-name="Group 8371" fill="#f19834" {...props}>
          <path
            data-name="Path 4960"
            d="M15.18 10.94a3.451 3.451 0 0 0 .32-1.44A3.5 3.5 0 0 0 12 6a3.451 3.451 0 0 0-1.44.32Z"
          />
          <path
            data-name="Path 4961"
            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 13a9.947 9.947 0 0 0-6.14 2.12A7.963 7.963 0 0 1 5.69 7.1l2.86 2.86a3.47 3.47 0 0 0 2.99 2.99l2.2 2.2A10.051 10.051 0 0 0 12 15Zm6.31 1.9L7.1 5.69A7.9 7.9 0 0 1 12 4a7.987 7.987 0 0 1 6.31 12.9Z"
          />
        </g>
      </g>
    </svg>
  ),
  selectStaff: (props) => (
    <svg
      id="badge_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <g id="Group_8368" data-name="Group 8368">
        <rect
          id="Rectangle_2942"
          data-name="Rectangle 2942"
          width="24"
          height="24"
          fill="none"
        />
      </g>
      <g id="Group_8369" data-name="Group 8369">
        <path
          id="Path_4959"
          data-name="Path 4959"
          d="M20,7H15V4a2.006,2.006,0,0,0-2-2H11A2.006,2.006,0,0,0,9,4V7H4A2.006,2.006,0,0,0,2,9V20a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V9A2.006,2.006,0,0,0,20,7ZM9,12a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,9,12Zm3,6H6v-.75c0-1,2-1.5,3-1.5s3,.5,3,1.5Zm1-9H11V4h2Zm5,7.5H14V15h4Zm0-3H14V12h4Z"
          fill="#a4a4a4"
          {...props}
        />
      </g>
    </svg>
  ),
  user: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}>
      <path style={{ fill: "none" }} d="M0,0H24V24H0Z" />
      <circle
        style={{
          fill: "none",
          stroke: "#fff",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "1.5px",
        }}
        cx="4"
        cy="4"
        r="4"
        transform="translate(8 3)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#fff",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "1.5px",
        }}
        d="M6,21V19a4,4,0,0,1,4-4h4a4,4,0,0,1,4,4v2"
      />
    </svg>
  ),
  notificationStaff: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-notification"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#ffffff"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 6h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
      <circle cx="17" cy="7" r="3" />
    </svg>
  ),
  myPage: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}
      {...props}>
      <defs>
        <style>
          {
            ".prefix__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}"
          }
        </style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <rect
        className="prefix__b"
        width={18}
        height={16}
        rx={3}
        transform="translate(3 4)"
      />
      <circle
        className="prefix__b"
        cx={2}
        cy={2}
        r={2}
        transform="translate(7 8)"
      />
      <path className="prefix__b" d="M15 8h2M15 12h2M7 16h10" />
    </svg>
  ),
  coupon: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}
      {...props}>
      <defs>
        <style>
          {
            ".prefix__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}"
          }
        </style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <rect
        className="prefix__b"
        width={18}
        height={4}
        rx={1}
        transform="translate(3 8)"
      />
      <path
        className="prefix__b"
        d="M12 8v13M19 12v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7M7.5 8a2.5 2.5 0 010-5c1.974-.034 3.76 1.949 4.5 5 .74-3.051 2.526-5.034 4.5-5a2.5 2.5 0 010 5"
      />
    </svg>
  ),
  store: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}
      {...props}>
      <defs>
        <style>
          {
            ".prefix__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}"
          }
        </style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        className="prefix__b"
        d="M3 21h18M3 7v1a3 3 0 106 0V7m0 1a3 3 0 106 0V7m0 1a3 3 0 106 0V7H3l2-4h14l2 4M5 21V10.85M19 21V10.85M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4"
      />
    </svg>
  ),
  slideSetting: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}
      {...props}>
      <defs>
        <style>
          {
            ".prefix__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}"
          }
        </style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <rect
        className="prefix__b"
        width={6}
        height={6}
        rx={1}
        transform="translate(4 5)"
      />
      <path className="prefix__b" d="M14 7h6M14 11h6M4 15h16M4 19h16" />
    </svg>
  ),
  push: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}
      {...props}>
      <defs>
        <style>
          {
            ".prefix__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}"
          }
        </style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        className="prefix__b"
        d="M10 5a2 2 0 014 0 7 7 0 014 6v3a4 4 0 002 3H4a4 4 0 002-3v-3a7 7 0 014-6M9 17v1a3 3 0 006 0v-1"
      />
    </svg>
  ),
  homePage: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}
      {...props}>
      <defs>
        <style>
          {
            ".prefix__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}"
          }
        </style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        className="prefix__b"
        d="M6 15h15M21 19H6M15 11h6M21 7h-6M9 9h1a1 1 0 11-1 1V7.5a2 2 0 012-2M3 9h1a1 1 0 11-1 1V7.5a2 2 0 012-2"
      />
    </svg>
  ),
  review: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}
      {...props}>
      <defs>
        <style>
          {
            ".prefix__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}"
          }
        </style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        className="prefix__b"
        d="M12 20l-3-3H7a3 3 0 01-3-3V8a3 3 0 013-3h10a3 3 0 013 3v6a3 3 0 01-3 3h-2l-3 3M8 9h8M8 13h6"
      />
    </svg>
  ),
  staff: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}
      {...props}>
      <defs>
        <style>
          {
            ".prefix__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}"
          }
        </style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <circle
        className="prefix__b"
        cx={4}
        cy={4}
        r={4}
        transform="translate(5 3)"
      />
      <path
        className="prefix__b"
        d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85"
      />
    </svg>
  ),
  pointHistory: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}
      {...props}>
      <defs>
        <style>
          {
            ".prefix__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}"
          }
        </style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <path className="prefix__b" d="M3 3v18h18" />
      <circle
        className="prefix__b"
        cx={2}
        cy={2}
        r={2}
        transform="translate(7 7)"
      />
      <circle
        className="prefix__b"
        cx={2}
        cy={2}
        r={2}
        transform="translate(17 5)"
      />
      <circle
        className="prefix__b"
        cx={2}
        cy={2}
        r={2}
        transform="translate(12 13)"
      />
      <path
        className="prefix__b"
        d="M10.16 10.62l2.34 2.88M15.088 13.328l2.837-4.586"
      />
    </svg>
  ),
  gacha: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}
      {...props}>
      <defs>
        <style>
          {
            ".prefix__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}"
          }
        </style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        className="prefix__b"
        d="M4 5h2M5 4v2M11.5 4L11 6M18 5h2M19 4v2M15 9l-1 1M18 13l2-.5M18 19h2M19 18v2M14 16.518L7.482 10l-4.39 9.58a1 1 0 001.329 1.329L14 16.519z"
      />
    </svg>
  ),
  combo: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}
      {...props}>
      <defs>
        <style>
          {
            ".prefix__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}"
          }
        </style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        className="prefix__b"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
      />
      <rect
        className="prefix__b"
        width={6}
        height={4}
        rx={2}
        transform="translate(9 3)"
      />
      <path className="prefix__b" d="M9 12h.01M13 12h2M9 16h.01M13 16h2" />
    </svg>
  ),
  cancelBooking: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#f7f9fa"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <path d="M10 12l4 4m0 -4l-4 4" />
    </svg>
  ),

  staffChangeHistory: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#f7f9fa"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
      <line x1="16" y1="5" x2="19" y2="8" />
    </svg>
  ),

  logout: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}
      {...props}>
      <defs>
        <style>
          {
            ".prefix__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}"
          }
        </style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <path className="prefix__b" d="M7 6a7.75 7.75 0 1010 0M12 4v8" />
    </svg>
  ),
  pointReception: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}
      {...props}>
      <defs>
        <style>
          {
            ".prefix__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}"
          }
        </style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        className="prefix__b"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
      />
      <rect
        className="prefix__b"
        width={6}
        height={4}
        rx={2}
        transform="translate(9 3)"
      />
      <path className="prefix__b" d="M9 14l2 2 4-4" />
    </svg>
  ),
  visitHistory: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ verticalAlign: "sub" }}
      {...props}>
      <defs>
        <style>
          {
            ".prefix__b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}"
          }
        </style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        className="prefix__b"
        d="M15 21H6a3 3 0 01-3-3v-1h10v2a2 2 0 004 0V5a2 2 0 112 2h-2m2-4H8a3 3 0 00-3 3v11M9 7h4M9 11h4"
      />
    </svg>
  ),
  datepicker: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.1}
      height={19}
      viewBox="0 0 17.1 19"
      {...props}>
      <g data-name="Group 7990" fill="#757575">
        <path
          data-name="Path 4073"
          d="M15.2 1.9h-.95V0h-1.9v1.9h-7.6V0h-1.9v1.9H1.9A1.891 1.891 0 00.01 3.8L0 17.1A1.9 1.9 0 001.9 19h13.3a1.906 1.906 0 001.9-1.9V3.8a1.906 1.906 0 00-1.9-1.9zm0 15.2H1.9V6.65h13.3z"
        />
        <g data-name="Group 7989">
          <path
            data-name="Rectangle 2293"
            d="M4.171 8.821h1.792v1.792H4.171z"
          />
          <path
            data-name="Rectangle 2294"
            d="M7.654 8.821h1.792v1.792H7.654z"
          />
          <path
            data-name="Rectangle 2295"
            d="M11.137 8.821h1.792v1.792h-1.792z"
          />
          <path
            data-name="Rectangle 2296"
            d="M4.171 12.66h1.792v1.792H4.171z"
          />
          <path
            data-name="Rectangle 2297"
            d="M7.654 12.66h1.792v1.792H7.654z"
          />
          <path
            data-name="Rectangle 2298"
            d="M11.137 12.66h1.792v1.792h-1.792z"
          />
        </g>
      </g>
    </svg>
  ),

  calendarTime: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-calendar-time"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#fff"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" />
      <circle cx="18" cy="18" r="4" />
      <path d="M15 3v4" />
      <path d="M7 3v4" />
      <path d="M3 11h16" />
      <path d="M18 16.496v1.504l1 1" />
    </svg>
  ),

  fileSearch: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-file-search"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#fff"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" />
      <circle cx="16.5" cy="17.5" r="2.5" />
      <line x1="18.5" y1="19.5" x2="21" y2="22" />
    </svg>
  ),
  registrationBlack: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#fff">
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <g>
          <rect height="4" width="4" x="10" y="4" />
          <rect height="4" width="4" x="4" y="16" />
          <rect height="4" width="4" x="4" y="10" />
          <rect height="4" width="4" x="4" y="4" />
          <rect height="4" width="4" x="16" y="4" />
          <polygon points="11,17.86 11,20 13.1,20 19.08,14.03 16.96,11.91" />
          <polygon points="14,12.03 14,10 10,10 10,14 12.03,14" />
          <path d="M20.85,11.56l-1.41-1.41c-0.2-0.2-0.51-0.2-0.71,0l-1.06,1.06l2.12,2.12l1.06-1.06C21.05,12.07,21.05,11.76,20.85,11.56z" />
        </g>
      </g>
    </svg>
  ),
};

export { Svgs };
