
public class binSearch {
    public static int getPivot(int arr[], int n) {
        int s = 0;
        int e = n - 1;
        while (s <= e) {
            int mid = s + (e - s) / 2;
            if (arr[0] < arr[mid]) {
                s = mid + 1;
            } else {
                e = mid;
            }
        }
        return s;
    }

    public static void main(String[] args) {
        int arr[] = { 4, 5, 6, 7, 0, 1, 2 };
        int n = arr.length;
        System.out.println("Pivot is : " + getPivot(arr, n));
    }
}