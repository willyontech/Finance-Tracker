# Data Model
Primary entity: Transaction / Record

Fields:
- id: string, format txn_1, generated via uid()
- description/title: string, 3-50 chars, regex /^\S(?:.*\S)?$/ + collapse doubles
- amount: number (or duration/pages depending on theme), regex /^(0|[1-9]\d*)(\.\d{1,2})?$/
- category/tag: string, regex /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/
- date: string YYYY-MM-DD, regex /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
- createdAt: ISO string, auto-generated
- updatedAt: ISO string, auto-updated on edit

Storage: localStorage key 'app:data' + 'app:settings'
Settings: cap (number), usd/eur rates (number), cats (array)