import {useState} from 'react';
import {
  TableContainer,
  TableWrapper,
  TableRow,
  TableHead,
  TableData,
  VoucherImage,
  ImageWrapper,
  Image,
  DeleteButton,
  TableHeader,
} from './styles';
import {currencyFormat, getImageURL} from '@utils/helpers';
import {Modal} from '..';

interface TableProps {
  ItemList: any;
  onDeleteClick: (tableId: string) => void;
}

interface ItemType {
  _id: string;
  Voucher_Type: string;
  Voucher_Number: string;
  Amount: number;
  Date: string;
  Location: string;
  Voucher_Image: string;
  Voucher_Image_URL: string;
}

const Table: React.FC<TableProps> = ({ItemList, onDeleteClick}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedTableID, setselectedTableID] = useState<string>('');

  return (
    <>
      <TableContainer>
        <TableWrapper>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Voucher Type</TableHead>
              <TableHead>Voucher No.</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {ItemList?.length ? (
              ItemList?.map((item: ItemType, index: number) => {
                const {
                  _id,
                  Voucher_Type,
                  Voucher_Number,
                  Voucher_Image,
                  Voucher_Image_URL,
                  Location,
                  Amount,
                  Date,
                } = item;
                return (
                  <TableRow key={index}>
                    <TableData>{index + 1}</TableData>
                    <TableData style={{padding: '6px 10px'}}>
                      {Voucher_Image_URL ? (
                        <VoucherImage
                          src={Voucher_Image_URL}
                          alt="voucher-img"
                          onClick={() => setSelectedImage(index)}
                          loading="lazy"
                        />
                      ) : (
                        <VoucherImage
                          src={getImageURL(Voucher_Image)}
                          alt="voucher-img"
                          onClick={() => setSelectedImage(index)}
                          loading="lazy"
                        />
                      )}
                      {selectedImage === index && (
                        <>
                          <ImageWrapper
                            onClick={() => setSelectedImage(null)}
                          />
                          <Image
                            src={
                              Voucher_Image_URL || getImageURL(Voucher_Image)
                            }
                            loading="lazy"
                          />
                        </>
                      )}
                    </TableData>
                    <TableData>{Voucher_Type}</TableData>
                    <TableData>{Voucher_Number}</TableData>
                    <TableData>
                      {Amount ? currencyFormat(Amount) : '---'}
                    </TableData>
                    <TableData>{Date}</TableData>
                    <TableData>{Location || '---'}</TableData>
                    <TableData>
                      <DeleteButton
                        onClick={() => {
                          setVisible(true);
                          setselectedTableID(_id);
                        }}
                      >
                        Delete
                      </DeleteButton>
                    </TableData>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableData>
                  <p>No Vouchers Found</p>
                </TableData>
              </TableRow>
            )}
          </tbody>
        </TableWrapper>
      </TableContainer>
      <Modal
        description="Are you sure to delete the voucher?"
        visible={visible}
        onRequestClose={() => setVisible(false)}
        onConfirm={() => {
          onDeleteClick(selectedTableID);
          setVisible(false);
        }}
      />
    </>
  );
};

export default Table;
