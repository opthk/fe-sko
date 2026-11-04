import { createMuiTheme } from '@material-ui/core/styles';

// Shared dark MUI / mui-datatables theme matching the SKO look
// (navy glass card, red accent, cyan highlights, readable 12.5px cells).
const red = '#ec1e24';
const cyan = '#5ed6ff';
const paper = '#0f222c';
const paperAlt = '#122935';
const head = '#0b1a22';
const border = 'rgba(255, 255, 255, 0.08)';
const text = 'rgba(255, 255, 255, 0.88)';
const textMuted = 'rgba(255, 255, 255, 0.55)';

const skoTableTheme = (extra = {}) => createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'inherit',
  },
  palette: {
    type: 'dark',
    primary: { main: cyan },
    secondary: { main: '#ff4a4f' },
    background: {
      paper,
      default: head,
    },
    text: {
      primary: text,
      secondary: textMuted,
    },
    divider: border,
  },
  overrides: {
    MuiPaper: {
      elevation4: {
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
      },
      rounded: {
        borderRadius: 14,
      },
    },
    MUIDataTable: {
      paper: {
        overflow: 'hidden',
        border: `1px solid ${border}`,
        backgroundColor: paper,
      },
      responsiveScrollMaxHeight: {
        maxHeight: 'calc(100vh - 360px)',
        minHeight: 360,
      },
      responsiveScroll: {
        minHeight: 360,
      },
      ...(extra.MUIDataTable || {}),
    },
    MUIDataTableToolbar: {
      root: {
        minHeight: 56,
        borderBottom: `1px solid ${border}`,
      },
      titleText: {
        color: '#fff',
        fontWeight: 600,
      },
      icon: {
        color: textMuted,
        '&:hover': { color: cyan },
      },
      iconActive: {
        color: '#ff4a4f',
      },
    },
    MUIDataTableFilterList: {
      root: {
        margin: '8px 16px 0',
      },
      chip: {
        margin: '0 8px 8px 0',
        backgroundColor: 'rgba(236, 30, 36, 0.18)',
        color: '#ffb3b5',
        fontWeight: 600,
      },
    },
    MUIDataTableHeadCell: {
      root: {
        padding: '12px 10px',
      },
      fixedHeader: {
        backgroundColor: head,
        color: textMuted,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        borderBottom: `2px solid ${border}`,
      },
      sortActive: {
        color: '#fff',
      },
    },
    MuiTableSortLabel: {
      active: {
        color: '#fff !important',
      },
      icon: {
        color: `${red} !important`,
      },
    },
    MUIDataTableBodyRow: {
      root: {
        '&:nth-of-type(even)': {
          backgroundColor: paperAlt,
        },
      },
    },
    MUIDataTableBodyCell: {
      root: {
        fontSize: 12.5,
        color: text,
      },
    },
    MuiTableRow: {
      hover: {
        '&:hover': {
          backgroundColor: 'rgba(94, 214, 255, 0.08) !important',
        },
      },
    },
    MuiTableCell: {
      root: {
        padding: '8px 10px',
        textAlign: 'center',
        borderBottom: `1px solid ${border}`,
      },
    },
    MuiIconButton: {
      root: {
        padding: 6,
      },
    },
    MuiTablePagination: {
      root: {
        borderBottom: 0,
        color: textMuted,
      },
    },
    MuiPopover: {
      paper: {
        border: `1px solid ${border}`,
        borderRadius: 16,
        backgroundColor: paperAlt,
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.55)',
      },
    },

    // ---- Filter panel: same look as the dark form modals (.sko-modal-dark) ----
    MUIDataTableFilter: {
      root: {
        minWidth: 320,
        padding: '0 22px 26px',
        background: `linear-gradient(180deg, #102530 0%, ${head} 100%)`,
        fontFamily: 'inherit',
      },
      header: {
        position: 'relative',
        alignItems: 'center',
        margin: '0 -22px 18px',
        padding: '16px 22px',
        width: 'auto',
        borderBottom: `1px solid ${border}`,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -1,
          height: 2,
          background: `linear-gradient(90deg, ${red} 0%, rgba(236, 30, 36, 0.3) 45%, rgba(236, 30, 36, 0) 100%)`,
        },
      },
      title: {
        marginLeft: 0,
        color: '#fff',
        fontSize: 16,
        fontWeight: 700,
      },
      resetLink: {
        color: '#ff7a7e',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        '&:hover': { color: '#fff' },
      },
      checkboxListTitle: {
        marginLeft: 0,
        color: cyan,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      },
      checkboxFormControlLabel: {
        color: text,
        fontSize: 13,
      },
      gridListTile: {
        marginTop: 12,
      },
    },

    // Labels above inputs (no colour change on focus, like the modal labels)
    MuiFormLabel: {
      root: {
        color: 'rgba(255, 255, 255, 0.72)',
        fontSize: 13,
        '&$focused': { color: 'rgba(255, 255, 255, 0.72)' },
      },
      focused: {},
    },
    // Always keep the label above the box. Dropdown filters always have a value
    // ("All") so their label is shrunk, but an empty text filter (STA) would
    // otherwise leave its label floating inside the input.
    MuiInputLabel: {
      formControl: {
        transform: 'translate(0, 1.5px) scale(1)',
      },
      shrink: {
        transform: 'translate(0, 1.5px) scale(1)',
      },
      animated: {
        transition: 'none',
      },
    },

    // Boxed inputs instead of Material underline inputs
    MuiInput: {
      root: {
        minHeight: 40,
        padding: '0 12px',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        color: '#fff',
        fontSize: 13,
        transition: 'border-color 0.15s, box-shadow 0.15s, background-color 0.15s',
      },
      formControl: {
        'label + &': { marginTop: 22 },
      },
      focused: {
        borderColor: red,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        boxShadow: '0 0 0 3px rgba(236, 30, 36, 0.2)',
      },
      underline: {
        '&:before, &:after, &:hover:not($disabled):not($focused):not($error):before': {
          display: 'none',
        },
      },
      disabled: {},
      error: {},
      input: {
        padding: '10px 0',
        '&::placeholder': { color: 'rgba(255, 255, 255, 0.35)', opacity: 1 },
      },
    },
    MuiSelect: {
      select: {
        '&:focus': { backgroundColor: 'transparent' },
      },
      icon: {
        color: textMuted,
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: 13,
        color: text,
        '&$selected': {
          backgroundColor: 'rgba(236, 30, 36, 0.18)',
          color: '#fff',
        },
        '&$selected:hover': {
          backgroundColor: 'rgba(236, 30, 36, 0.26)',
        },
      },
      selected: {},
    },
    // Only text buttons inside the table use this (e.g. the filter "Reset")
    MuiButton: {
      textPrimary: {
        color: '#ff7a7e',
        '&:hover': {
          color: '#fff',
          backgroundColor: 'rgba(236, 30, 36, 0.12)',
        },
      },
    },
    MuiCheckbox: {
      colorPrimary: {
        '&$checked': { color: red },
      },
      checked: {},
    },
  },
});

export default skoTableTheme;
