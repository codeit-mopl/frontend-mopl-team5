import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { authService } from '@/lib/api'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { toast } from 'sonner'

const forgotPasswordSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setIsLoading(true)
      await authService.forgotPassword(data)
      setIsSubmitted(true)
      toast.success('비밀번호 재설정 이메일이 발송되었습니다')
    } catch (error) {
      toast.error('이메일 발송에 실패했습니다. 다시 시도해주세요.')
      console.error('Forgot password error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg text-center">
          <div>
            <h1 className="text-3xl font-bold">이메일을 확인하세요</h1>
            <p className="mt-4 text-sm text-gray-600">
              비밀번호 재설정 링크가 포함된 이메일을 발송했습니다.
              이메일을 확인하고 링크를 클릭하여 비밀번호를 재설정하세요.
            </p>
          </div>

          <Button
            onClick={() => navigate('/sign-in')}
            className="w-full"
          >
            로그인 페이지로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">비밀번호 찾기</h1>
          <p className="mt-2 text-sm text-gray-600">
            가입하신 이메일 주소를 입력하시면
            비밀번호 재설정 링크를 보내드립니다.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  전송 중...
                </>
              ) : (
                '비밀번호 재설정 이메일 보내기'
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <Link
            to="/sign-in"
            className="text-primary hover:underline"
          >
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
