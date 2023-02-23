import { useContext, useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import Loader from 'components/shared/loader';
import Button from 'components/shared/button';
import PageTable from 'components/shared/table';
import { TransactionServiceContext } from 'utils/services/service/transactionService';
import { TransactionData } from 'types/transaction';

import styles from './transaction.module.scss';

export const transactionColumns = [
  {
    title: 'Transaction Hash',
    dataIndex: 'hash',
    key: 'hash',
    render: (hash: string) => {
      return (
        <Tooltip placement="topLeft" title={hash}>
          <div className={styles.textSplit}>{hash}</div>
        </Tooltip>
      );
    },
  },
  {
    title: 'Receiver',
    dataIndex: 'receiver',
    key: 'receiver',
    render: (receiver: string) => {
      return (
        <Tooltip placement="topLeft" title={receiver}>
          <div className={styles.textSplit}>{receiver}</div>
        </Tooltip>
      );
    },
  },
  {
    title: 'Sender',
    dataIndex: 'sender',
    key: 'sender',
    render: (sender: string) => {
      return (
        <Tooltip placement="topLeft" title={sender}>
          <div className={styles.textSplit}>{sender}</div>
        </Tooltip>
      );
    },
  },
  {
    title: 'Open Etherscan',
    dataIndex: 'hash',
    render: (hash: string) => {
      return (
        <Button
          style={{ width: '100%' }}
          onClick={() =>
            window.open(`https://etherscan.io/tx/${hash}`, '_blank')
          }
        >
          Go To Transaction
        </Button>
      );
    },
  },
];

export default function Transaction(): JSX.Element {
  const transactionService = useContext(TransactionServiceContext);

  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countOfPage, setCountOfPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [firstRefresh, setFirstRefresh] = useState<boolean>(true);

  const getAllTransactions = async (): Promise<void> => {
    const res = await transactionService.getAllTransactions(
      limit,
      limit * (currentPage - 1)
    );

    if (Array.isArray(res?.data)) {
      setCountOfPage(Math.ceil(res.count / limit) * 10);
      setTransactions(res.data);
      setFirstRefresh(false);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [currentPage, limit]);

  return transactions.length || !firstRefresh ? (
    <div className={styles.container}>
      <PageTable
        headerText="Transactions"
        dataSource={transactions}
        columns={transactionColumns}
        limit={limit}
        setLimit={setLimit}
        countOfPage={countOfPage}
        setCurrentPage={setCurrentPage}
        tableLayout="auto"
      />
    </div>
  ) : (
    <Loader />
  );
}
