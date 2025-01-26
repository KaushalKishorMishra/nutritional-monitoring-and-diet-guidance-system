const ListSkeleton = () => {
    return (
        <div className="absolute left-0 top-0 h-full w-full bg-base-100">
            <div className="flex w-52 flex-col gap-4">
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        </div>
    )
}

export default ListSkeleton
