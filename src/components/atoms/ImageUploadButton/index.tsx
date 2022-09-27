// /**
//  * 画像ファイルアップロード
//  */
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import * as React from 'react'
import { ChangeEventHandler } from 'react'

interface ImageUploadButtonProps {
  /**
   * ファイル選択した時のイベントハンドラ
   */
  onPost?: (formData: FormData) => void
}

export default function ImageUploadButton(props: ImageUploadButtonProps) {
  // 画像ファイルアップロード
  const uploadImageFile: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.currentTarget.files
    if (!files || files?.length === 0) return
    const file = files[0]

    const formData = new FormData()
    formData.append('file', file)

    // 外部処理実行
    props.onPost && props.onPost(formData)
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        size="large"
      >
        <input
          hidden
          accept=".jpg,.png,.jpeg"
          type="file"
          onChange={uploadImageFile}
        />
        <AddAPhotoIcon />
      </IconButton>
    </Stack>
  )
}
