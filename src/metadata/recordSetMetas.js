export const recordSetMetas = [
  {
    id: "fnclstmt1",
    name: "Non consolidated FS 11000",
    name_ja: "個別財務諸表 11000",
    columns: [
      {
        id: "ACCTCD",
        name: "Account Code",
        key: true,
        editable: false
      },
      {
        id: "ACCTSNJ",
        name: "Account Name",
        key: false,
        editable: false
      },
      {
        id: "DRCR_FRGNAT",
        name: "Amount",
        key: false,
        editable: true
      },
      {
        id: "VERSION",
        name: "Version",
        key: false,
        editable: false
      }
    ]
  },
  {
    id: "fnclstmt2",
    name: "Non consolidated FS 38184",
    name_ja: "個別財務諸表 38184",
    columns: [
      {
        id: "ACCTCD",
        name: "Account Code",
        key: true,
        editable: false
      },
      {
        id: "ACCTSNJ",
        name: "Account Name",
        key: false,
        editable: false
      },
      {
        id: "DRCR_FRGNAT",
        name: "Amount",
        key: false,
        editable: true
      },
      {
        id: "VERSION",
        name: "Version",
        key: false,
        editable: false
      }
    ]
  },
  {
    id: "consolidated",
    name: "Consolidated FS",
    name_ja: "連結財務諸表",
    columns: [
      {
        id: "ACCTCD",
        name: "Account Code",
        key: true,
        editable: false
      },
      {
        id: "ACCTSNJ",
        name: "Account Name",
        key: false,
        editable: false
      },
      {
        id: "DRCR_FRGNAT",
        name: "Amount",
        key: false,
        editable: false
      },
      {
        id: "VERSION",
        name: "Version",
        key: false,
        editable: false
      }
    ]
  }
]

export function findMeta(id) {
  const meta = recordSetMetas.find( (meta) => {
    return meta.id === id
  })
  return meta
}
