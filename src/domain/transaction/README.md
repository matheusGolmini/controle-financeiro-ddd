# Transaction - Aggregate

```json
{
  "userId": "uuid",
  "totalValue": 100, //Dinamic calculations
  "reasonId": "uuid",
  "paymentDate": "2021-01-01 10:00:00", // Value Object
  "transaction-type": ["Entrada", "Saida"], // Value Object
  "status": ["Pendente", "Concluído"], // Value Object
  "note": "valid_description", // Value Object
  "attachment": "url", // Value Object
  "calculations": [
    {
      "budgetBoxId": "uuid",
      "Value": 50
    },
    {
      "budgetBoxId": "uuid",
      "Value": 50
    }
  ]
}
```

- transaction-type: Value Object (enum) - Ok
- status: Value Object (enum) - ok
- note: Value Object - ok
- attachment: Value Object - ok
- calculations: Value Object -ok
- paymentDate: Value Object - Ok